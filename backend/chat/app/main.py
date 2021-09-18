"""
Author: Ammar Saqib
"""
import json
import logging
from typing import List
from app.database import get_db
from fastapi import FastAPI, Header, WebSocket, WebSocketDisconnect, Depends
from routes import channel_routes, chat_routes
from controllers.chat_controller import ChatController
from app.utitilies import verification_details

app = FastAPI()
app.include_router(channel_routes.router)
app.include_router(chat_routes.router)


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
            await manager.send_personal_message(json.dumps(data), websocket)
            # await manager.broadcast(f"Client #{user_id} says: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
