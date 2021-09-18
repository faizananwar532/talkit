"""
Author: Ammar Saqib
"""

import redis
from os import environ


def get_db():
    """
    Returns the redis db object for operations
    """
    return redis.Redis(
        host=environ.get("REDIS_SERVER"),
        port=environ.get("REDIS_PORT"),
        password=environ.get("REDIS_PASSWORD"),
    )
