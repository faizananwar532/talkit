"""
Author: Ammar Saqib
"""
import logging
from fastapi import status
import json


class ChatController:
    """
    The class handles all operations related to controller
    """

    USER_HASH_PREFIX = "user:"
    USERNAME_SET = "usernames"

    CHANNELS_SET = "channels"
    CHANNEL_HASH_PREFIX = CHANNELS_SET[:-1] + ":"
    USER_CHANNELS_POSTFIX = ":" + CHANNELS_SET

    CHAT_CHANNEL_PARTICIPANTS = "channel:{}:participants"

    CHAT_MESSAGE_PREFIX = "message:"

    def __init__(self, _db):
        self.__db = _db  # for storing the redis db object

    def __decode_dictionary(self, ret):
        """
        The function byte decodes a dictionary and returns it
        """
        return {y.decode("utf-8"): ret.get(y).decode("utf-8") for y in ret.keys()}

    def create_channel(self, user_name, channel_details):
        """
        Creates a tenant in the system

        Status Codes:
        500 : when adding hash/set for channel OR in case for exception
        201 : tenant created_data
        200 : already exists
        """
        if self.__db.sismember(self.CHANNELS_SET, channel_details.name) == 0:
            try:
                # creating a HASH for channel details
                data_dict = channel_details.dict()
                data_dict["owner"] = user_name
                ret = self.__db.hset(
                    "{}{}".format(self.CHANNEL_HASH_PREFIX, channel_details.name),
                    mapping=data_dict,
                )

                if ret == 0:
                    return (
                        status.HTTP_500_INTERNAL_SERVER_ERROR,
                        "something went wrong adding HASH for channel",
                    )

                # adding channel to channels SET
                ret = self.__db.sadd(
                    "{}".format(self.CHANNELS_SET),
                    channel_details.name,
                )

                if ret == 0:
                    return (
                        status.HTTP_500_INTERNAL_SERVER_ERROR,
                        "something went wrong adding SET for channel",
                    )

                # adding channel to user's channels SET
                ret = self.__db.sadd(
                    "{}{}".format(user_name, self.USER_CHANNELS_POSTFIX),
                    channel_details.name,
                )

                if ret == 0:
                    return (
                        status.HTTP_500_INTERNAL_SERVER_ERROR,
                        "something went wrong adding SET for channel",
                    )

                return status.HTTP_201_CREATED, "channel created successfully"

            except:
                return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        return status.HTTP_200_OK, "Tenant already exists!"

    def list_channels(self):
        """
        Returns the list of all channels in the system

        Status Codes:
        500 : error while fetching
        200 : successfully fetched
        """

        try:
            _data = self.__db.smembers(self.CHANNELS_SET)
        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        if _data is None:
            return status.HTTP_404_NOT_FOUND, "no data against this"

        _data = list(_data)
        _data = [x.decode("utf-8") for x in _data]

        return status.HTTP_200_OK, _data

    def join_channel(self, user_name, channel_name):
        """
        Adds a mapping of channel against a user
        """

        try:
            # adding channel association with user
            _data = self.__db.sadd(
                "{}{}".format(user_name, self.USER_CHANNELS_POSTFIX), channel_name.name
            )

            # adding user to the channel
            _ = self.__db.sadd(self.CHAT_CHANNEL_PARTICIPANTS, user_name)
        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        if _data is None:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        return status.HTTP_201_CREATED, "you successfully joined the channel"

    def get_my_channels(self, user_name):
        """
        Gets the names of the channels for a particular user
        """

        try:
            _data = self.__db.smembers(
                "{}{}".format(user_name, self.USER_CHANNELS_POSTFIX)
            )
        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        if _data is None:
            return status.HTTP_404_NOT_FOUND, "no data against this"

        _data = list(_data)
        _data = [x.decode("utf-8") for x in _data]

        ret_data = []

        for channel in _data:
            ret = self.__db.hgetall("{}{}".format(self.CHANNEL_HASH_PREFIX, channel))
            ret = {y.decode("utf-8"): ret.get(y).decode("utf-8") for y in ret.keys()}
            ret_data.append(ret)

        return status.HTTP_200_OK, ret_data

    def send_to_channel(self, channel_name, message):
        """
        This function adds the message to the appropriate channel
        """

        try:
            id = self.__db.xadd(channel_name, {"type": "message"})
            logging.error(id)
            id = id.decode("utf-8")
            ret = self.__db.hset(
                "{}{}".format(self.CHAT_MESSAGE_PREFIX, id), mapping=message
            )
            logging.error(ret)
        except:
            return False

        return True

    def add_users(self, channel_name, user_lists):
        """
        Parses the list of users and adds their entries in the correct keys

        1- add user to the channel participants
        2- add channel to user's channel
        """

        user_list = user_lists.users.split(",")

        for user in user_list:
            res_status, _data = self.join_channel(user, channel_name)
            if res_status != 201:
                return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        return status.HTTP_200_OK, "users added"

    def get_all_convo(self, channel_name):
        """
        Fetches all of the conversations from a channel
        """

        try:
            data = self.__db.xrange("{}".format(channel_name))

        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        ret_data = []
        for id in data:
            decoded_id = id[0].decode("utf-8")
            ret = self.__db.hgetall("{}{}".format(self.CHAT_MESSAGE_PREFIX, decoded_id))
            ret = self.__decode_dictionary(ret)
            ret_data.append(ret)

        return status.HTTP_200_OK, ret_data

    def get_user_details(self, user_name):
        """
        Fetches the user profile of the user
        """

        try:
            data = self.__db.hgetall("{}{}".format(self.USER_HASH_PREFIX, user_name))
        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        data = self.__decode_dictionary(data)
        # logging.error(data)

        return status.HTTP_200_OK, data

    def add_user(self, _data):
        """
        The function will be triggered when an event is consumed

        _data: {
            "user_id": <id>,
            "username": <username>
        }
        """

        logging.error(type(_data))
        logging.error(_data)
        _data = json.loads(_data)["data"]
        user_name = _data["username"]
        _data["online"] = 1

        if _data["is_active"]:
            _data["is_active"] = 1
        else:
            _data["is_active"] = 0

        del _data["username"]

        try:
            self.__db.hset(
                "{}{}".format(self.USER_HASH_PREFIX, user_name), mapping=_data
            )
            self.__db.sadd(self.USERNAME_SET, user_name)

        except Exception as e:
            logging.error(e)
            return False

        return True
