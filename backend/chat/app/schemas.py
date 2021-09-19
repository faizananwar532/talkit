"""
Author: Ammar Saqib
"""

from pydantic import BaseModel


class ChannelDetails(BaseModel):
    name: str
    description: str


class ChannelName(BaseModel):
    name: str


class UserName(BaseModel):
    name: str


class UserList(BaseModel):
    users: str
