"""
Author: Ammar Saqib
"""

import logging
import os
import threading

import uvicorn

from app.main import app

from app.init_consumer import start_consumer

if __name__ == "__main__":

    a = threading.Thread(target=start_consumer, daemon=True)
    a.start()

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("CHAT_PORT")))
