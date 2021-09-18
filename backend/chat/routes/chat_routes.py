"""
Author: Ammar Saqib
"""

from controllers.tenant_controller import TenantController
from app.database import get_db
from app.schemas import TenantDetail
from fastapi import APIRouter, Header, Response, Depends

router = APIRouter(prefix="/v1/tenant", tags=["Tenants"])


@router.post("/{tenant_id}", status_code=201)
def create_tenant(
    tenant_details=TenantDetail,
    tenant_id=Header(None),
    _response=Response,
    _db=Depends(get_db),
):
    """
    Creating tenant
    """
    res_status, _data = TenantController.create_tenant(tenant_id, tenant_details)

    _response.status_code = res_status

    return {"data": _data}
