"""
Author: Ammar Saqib
"""
import logging
import asyncio
from controllers.chat_controller import ChatController
from app.database import get_db
from app.schemas import ChannelDetails, ChannelName
from fastapi import APIRouter, Header, Response, Depends
from app.utitilies import verification_details

router = APIRouter(prefix="/v1/channels", tags=["Channels"])


@router.post("/", status_code=201)
def create_channel(
    channel_details: ChannelDetails,
    _response=Response,
    _db=Depends(get_db),
    Authorization=Header(None),
):
    """
    Creating a channel
    """
    stat, auth_data = verification_details(Authorization)

    if stat != 200:
        _response.status_code = 500
        return {"data": "something happened"}

    res_status, _data = ChatController(_db).create_channel(
        auth_data["data"]["user"]["username"], channel_details
    )

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


@router.post("/join", status_code=201)
def join_channel(
    channel_name: ChannelName,
    _response=Response,
    _db=Depends(get_db),
    Authorization=Header(None),
):
    """
    To join a certain channel
    """

    stat, auth_data = verification_details(Authorization)

    if stat != 200:
        _response.status_code = 500
        return {"data": "something happened"}

    res_status, _data = ChatController(_db).join_channel(
        auth_data["data"]["user"]["username"], channel_name
    )

    _response.status_code = res_status

    return {"data": _data}


@router.get("/my", status_code=200)
def my_channels(_response=Response, _db=Depends(get_db), Authorization=Header(None)):
    """
    Gets the list of channel for a particular user
    """

    stat, auth_data = verification_details(Authorization)

    if stat != 200:
        _response.status_code = 500
        return {"data": "something happened"}

    res_status, _data = ChatController(_db).get_my_channels(
        auth_data["data"]["user"]["username"]
    )

    _response.status_code = res_status

    return {"data": _data}
