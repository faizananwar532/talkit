"""
Author: Ammar Saqib
"""

from fastapi import FastAPI

from routes import (
    channel_routes,
)

app = FastAPI()
app.include_router(channel_routes.router)
