"""
Author: Ammar Saqib
"""
import logging
import asyncio
from controllers.chat_controller import ChatController
from app.database import get_db
from app.schemas import ChannelDetails
from fastapi import APIRouter, Header, Response, Depends

router = APIRouter(prefix="/v1/channels", tags=["Channels"])


@router.post("/", status_code=201)
async def create_channel(
    channel_details=ChannelDetails,
    _response=Response,
    _db=Depends(get_db),
):
    """
    Creating a channel
    """
    res_status, _data = await ChatController(_db).create_channel(channel_details)

    _response.status_code = res_status

    return {"data": _data}


@router.get("/", status_code=200)
def list_all_channels(_response=Response, _db=Depends(get_db)):

    """
    Fetches all channel names from the datastore
    """

    res_status, _data = ChatController(_db).list_channels()

    _response.status_code = res_status

    return {"data": _data}
