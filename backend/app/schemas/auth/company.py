from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class CompanyBase(BaseModel):
    name:  Optional[str] = None
    image: Optional[str] = None
 
class CompanyCreate(CompanyBase):
    name: str
 
class CompanyUpdate(CompanyBase):
    pass
 
class CompanyOut(CompanyBase):
    id:         int
    created_at: Optional[datetime] = None
    model_config = {"from_attributes": True}
 