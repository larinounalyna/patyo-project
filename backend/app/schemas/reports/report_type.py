from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ReportTypeBase(BaseModel):
    name: str  # daily, meeting
 
class ReportTypeCreate(ReportTypeBase):
    pass
 
class ReportTypeUpdate(BaseModel):
    name: Optional[str] = None
 
class ReportTypeOut(ReportTypeBase):
    id: int
    model_config = {"from_attributes": True}