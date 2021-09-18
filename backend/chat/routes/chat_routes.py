"""
Author: Ammar Saqib
"""

import logging
from typing import List
from app.database import get_db
from app.utitilies import verification_details
from controllers.chat_controller import ChatController
from fastapi import APIRouter, Depends, Header, Response, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/v1/chat", tags=["Chat"])

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:3060/ws/testing/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzIwMDY5MDUsInVzZXIiOnsidXNlcl9pZCI6MzQsInVzZXJuYW1lIjoiYXdhaXMiLCJlbWFpbCI6ImF3YWlzQGdhbWFpbC5jb20ifSwiaWF0IjoxNjMyMDAzMzA1fQ.zbVllIg9FunGCfaVZisuCKCAL4v744R7L5GIa2IRyNY`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/page")
async def get():
    """
    Something to mimic socket previews
    """
    return HTMLResponse(html)


@router.get("/", status_code=200)
def get_all_convo(
    _response=Response,
    _db=Depends(get_db),
    Authorization=Header(None),
):
    """
    Fetch all of the data from the channel stream
    """
    pass
