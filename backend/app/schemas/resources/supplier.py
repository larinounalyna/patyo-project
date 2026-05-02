from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class SupplierBase(BaseModel):
    name:         str
    initials:     Optional[str] = None
    contact_info: Optional[str] = None
 
class SupplierCreate(SupplierBase):
    pass
 
class SupplierUpdate(BaseModel):
    name:         Optional[str] = None
    initials:     Optional[str] = None
    contact_info: Optional[str] = None
 
class SupplierOut(SupplierBase):
    id: int
    model_config = {"from_attributes": True}