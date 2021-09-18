"""
Author: Ammar Saqib
"""

from fastapi import FastAPI

from routes import (
    chat_routes,
)

app = FastAPI()
app.include_router(chat_routes.router)
