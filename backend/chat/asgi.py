"""
Author: Ammar Saqib
"""

import logging
import os
import threading

import uvicorn

from app.main import app
from app.init_consumer import start

if __name__ == "__main__":

    a = threading.Thread(start, daemon=True)

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("OVERSEER_PORT")))
