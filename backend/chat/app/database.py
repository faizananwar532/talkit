"""
Author: Ammar Saqib
"""

import aioredis
from os import environ


def get_db():
    """
    Returns the redis db object for operations
    """
    return aioredis.from_url(
        "redis://localhost:" + environ.get("REDIS_PORT"), decode_response=True
    )
