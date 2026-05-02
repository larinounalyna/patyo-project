from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ResourceAllocationBase(BaseModel):
    resource_id:   int
    project_id:    int
    quantity_used: Optional[Decimal] = None
    phase:         Optional[str] = None   # structure, MEP, etc.
    status:        Optional[str] = None   # deployed, reserved, returned
 
class ResourceAllocationCreate(ResourceAllocationBase):
    pass
 
class ResourceAllocationUpdate(BaseModel):
    quantity_used: Optional[Decimal] = None
    phase:         Optional[str] = None
    status:        Optional[str] = None
 
class ResourceAllocationOut(ResourceAllocationBase):
    id:          int
    assigned_at: Optional[datetime] = None
    model_config = {"from_attributes": True}