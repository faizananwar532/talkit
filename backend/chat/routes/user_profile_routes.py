"""
Author: Ammar Saqib
"""

import logging
from typing import List
from app.database import get_db
from app.schemas import ChannelName
from app.utitilies import verification_details
from controllers.chat_controller import ChatController
from fastapi import APIRouter, Depends, Header, Response
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/v1/user_profile", tags=["User Profile"])


@router.get("/")
def get_user_profiles(
    _response=Response,
    _db=Depends(get_db),
    Authorization=Header(None),
):
    """
    Fetches the details of the user i.e. the profile
    """

    stat, data = verification_details(Authorization)

    if stat != 200:
        _response.status_code = 500
        return {"data": "Something went wrong"}

    data = data["data"]["user"]

    res_status, _data = ChatController(_db).get_user_details(data["username"])

    _response.status_code = res_status

    return {"data": _data}
