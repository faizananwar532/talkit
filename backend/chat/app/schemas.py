"""
Author: Ammar Saqib
"""

from pydantic import BaseModel


class TenantDetail(BaseModel):
    name: str
