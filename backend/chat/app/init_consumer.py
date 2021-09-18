"""
Author: Ammar Saqib
"""

import logging
import redis
import async_timeout
from controllers.chat_controller import ChatController

from app.database import get_db

_db = get_db()


def start_consumer():
    """
    Starts the consumption logic from the auth app
    """
    logging.error("starting consumer")
    pub_sub = _db.pubsub()
    pub_sub.subscribe("user_created")

    while True:
        message = pub_sub.get_message()
        if message is not None:
            if not isinstance(message["data"], int):
                logging.error(message["data"])
                message["data"] = message["data"].decode("utf-8")
                _ = ChatController(_db).add_user(message["data"])
