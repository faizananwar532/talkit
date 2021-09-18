"""
Author: Ammar Saqib
"""

from pydantic import BaseModel


class ChannelDetails(BaseModel):
    name: str
    description: str
