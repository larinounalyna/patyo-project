from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ResourceETABase(BaseModel):
    resource_id: int
    eta_date:    Optional[date] = None
    status_text: Optional[str] = None
    sub_text:    Optional[str] = None
 
class ResourceETACreate(ResourceETABase):
    pass
 
class ResourceETAUpdate(BaseModel):
    eta_date:    Optional[date] = None
    status_text: Optional[str] = None
    sub_text:    Optional[str] = None
 
class ResourceETAOut(ResourceETABase):
    id: int
    model_config = {"from_attributes": True}