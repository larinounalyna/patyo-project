from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ProjectBase(BaseModel):
    name:        Optional[str] = None
    description: Optional[str] = None
    company_id:  Optional[int] = None
 
class ProjectCreate(ProjectBase):
    name:       str
    company_id: int
    created_by: int
 
class ProjectUpdate(ProjectBase):
    pass
 
class ProjectOut(ProjectBase):
    id:         int
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None
    model_config = {"from_attributes": True}