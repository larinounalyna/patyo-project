from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr
from .supplier import SupplierOut

class ResourceBase(BaseModel):
    name:        str
    type:        str                      # equipment, material, tool
    code:        Optional[str] = None
    supplier_id: Optional[int] = None
    quantity:    Optional[Decimal] = None
    unit:        Optional[str] = None     # tons, unit, m3
    status:      Optional[str] = None     # ON_SITE, IN_TRANSIT, ORDERED, MAINTENANCE, AVAILABLE
 
class ResourceCreate(ResourceBase):
    pass
 
class ResourceUpdate(BaseModel):
    name:        Optional[str] = None
    type:        Optional[str] = None
    code:        Optional[str] = None
    supplier_id: Optional[int] = None
    quantity:    Optional[Decimal] = None
    unit:        Optional[str] = None
    status:      Optional[str] = None
 
class ResourceOut(ResourceBase):
    id:         int
    created_at: Optional[datetime] = None
    model_config = {"from_attributes": True}
 
class ResourceWithDetails(ResourceOut):
    supplier: Optional["SupplierOut"] = None

ResourceWithDetails.model_rebuild()
 