"""
Author: Ammar Saqib
"""

import asyncio

import aioredis
import async_timeout
from controllers.chat_controller import ChatController

from database import get_db


def start():
    """
    Starts the consumption logic from the auth app
    """
    _db = get_db()
    pub_sub = _db.pubsub()

    async def reader(channel: aioredis.client.PubSub):
        while True:
            try:
                async with async_timeout.timeout(1):
                    message = await channel.get_message(ignore_subscribe_messages=True)
                    if message is not None:

                        _ = ChatController(_db).add_user(message)

                    await asyncio.sleep(0.01)

            except asyncio.TimeoutError:
                pass

    async with pub_sub as p:
        await p.subscribe("user_created")
        await reader(p)  # wait for reader to complete
        # await p.unsubscribe("channel:1")
