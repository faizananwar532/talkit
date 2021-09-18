"""
Author: Ammar Saqib
"""

import asyncio
import aioredis


def start():
    """
    Starts the consumption logic from the auth app
    """


    async def reader(channel: aioredis.client.PubSub):
        while True:
            async with async_timeout.timeout(1):
                    message = await channel.get_message(ignore_subscribe_messages=True)
                    if message is not None:

                        
                        # print(f"(Reader) Message Received: {message}")
                        # if message["data"] == STOPWORD:
                        #     print("(Reader) STOP")
                        #     break
                    await asyncio.sleep(0.01)
            except asyncio.TimeoutError:
                pass

    async with psub as p:
        await p.subscribe("user_created")
        await reader(p)  # wait for reader to complete
        # await p.unsubscribe("channel:1")