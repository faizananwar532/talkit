"""
Author: Ammar Saqib
"""

import logging
import os
import threading

import uvicorn

from app.main import app

if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("OVERSEER_PORT")))
