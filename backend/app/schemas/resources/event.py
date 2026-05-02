from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ResourceEventBase(BaseModel):
    resource_id: int
    event_type:  Optional[str] = None    # maintenance, inspection, deployment, shipment
    progress:    Optional[int] = None    # 0–100
    note:        Optional[str] = None
 
class ResourceEventCreate(ResourceEventBase):
    pass
 
class ResourceEventUpdate(BaseModel):
    event_type: Optional[str] = None
    progress:   Optional[int] = None
    note:       Optional[str] = None
 
class ResourceEventOut(ResourceEventBase):
    id:         int
    event_date: Optional[datetime] = None
    model_config = {"from_attributes": True}