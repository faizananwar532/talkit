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
    USERNAME_HASH = "usernames"

    CHANNELS_SET = "channels"
    CHANNEL_HASH_PREFIX = CHANNELS_SET[:-1] + ":"
    USER_CHANNELS_POSTFIX = ":" + CHANNELS_SET

    def __init__(self, _db):
        self.__db = _db  # for storing the redis db object

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
            _data = self.__db.sadd(
                "{}:{}".format(user_name, self.CHANNELS_SET), channel_name.name
            )
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
            _data = self.__db.smembers("{}:{}".format(user_name, self.CHANNELS_SET))
        except:
            return status.HTTP_500_INTERNAL_SERVER_ERROR, "something went wrong"

        if _data is None:
            return status.HTTP_404_NOT_FOUND, "no data against this"

        _data = list(_data)
        _data = [x.decode("utf-8") for x in _data]

        return status.HTTP_200_OK, _data

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
            self.__db.sadd(self.USERNAME_HASH, user_name)

        except Exception as e:
            logging.error(e)
            return False

        return True
