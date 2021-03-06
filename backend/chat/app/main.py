"""
Author: Ammar Saqib
"""
import json
import logging
from typing import List

from controllers.chat_controller import ChatController
from fastapi import Depends, FastAPI, Header, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routes import channel_routes, chat_routes, user_profile_routes

from app.database import get_db
from app.utitilies import verification_details

app = FastAPI()

# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8080",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(channel_routes.router)
app.include_router(chat_routes.router)
app.include_router(user_profile_routes.router)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{channel_name}/{token}")
async def websocket_endpoint(
    websocket: WebSocket,
    channel_name: str,
    token: str,
    _db=Depends(get_db),
):
    """
    Web socket for chat stuff
    """
    stat, auth_data = verification_details("bearer " + token)
    logging.error(auth_data)

    if stat != 200:
        return

    auth_data = auth_data["data"]["user"]

    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()  # a json is expected
            logging.error(data)
            logging.error(type(data))

            # construct appropriate message body
            data = json.loads(data)
            data.update(auth_data)
            logging.error(data)

            # add message to stream
            _ = ChatController(_db).send_to_channel(channel_name, data)

            # send the received message
            # await manager.send_personal_message(json.dumps(data), websocket)
            await manager.broadcast(json.dumps(data))
            # await manager.broadcast(f"Client #{user_id} says: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
