"""
Author: Ammar Saqib
"""

import redis
from os import environ


def get_db():
    """
    Returns the redis db object for operations
    """
    return redis.Redis(host="redischatapp", port=6379)
