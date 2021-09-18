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

    def __init__(self, _db):
        self.__db = _db  # for storing the redis db object

    def create_tenant(self, tenant_id, tenant_details):
        """
        Creates a tenant in the system

        Status Codes:
        201 : tenant created_data
        200 : already exists
        """
        if self.__db.sismember("tenants", tenant_id) == 0:
            ret = self.__db.hset(
                "tenant:{}".format(tenant_id), mapping=tenant_details.dict()
            )
            if ret > 0:
                return status.HTTP_201_CREATED, "Tenant created!"

        else:
            return status.HTTP_200_OK, "Tenant already exists!"

    def add_user(self, _data):
        """
        The function will be triggered when an event is consumed

        _data: {
            "user_id": <id>,
            "username": <username>
        }
        """

        _data = json.loads(_data)["data"]
        logging.error(_data)
        user_name = _data["username"]
        _data["online"] = True

        del _data["username"]

        try:
            self.__db.hset("user:{}".format(user_name), mapping=_data)
            self.__db.sadd("usernames", user_name)
        except Exception as e:
            logging.error(e)
            return False

        return True
