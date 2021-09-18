"""
Author: Ammar Saqib
"""
import json
from typing import List

from fastapi import FastAPI, Header, WebSocket, WebSocketDisconnect
from routes import channel_routes, chat_routes

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


@app.websocket("/ws/{channel_name}/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket, user_id: int, Authorization: Header(None), channel_name: str
):
    stat, auth_data = verification_details(Authorization)

    if stat is not 200:
        return

    auth_data = auth_data["data"]["user"]

    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()  # a json is expected

            # construct appropriate message body
            data = json.loads(data)
            data.update(auth_data)

            # add message to stream

            # send the received message
            await manager.send_personal_message(data, websocket)
            # await manager.broadcast(f"Client #{user_id} says: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
