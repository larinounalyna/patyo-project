from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class RoleBase(BaseModel):
    name: str
 
class RoleCreate(RoleBase):
    pass
 
class RoleUpdate(BaseModel):
    name: Optional[str] = None
 
class RoleOut(RoleBase):
    id: int
    model_config = {"from_attributes": True}
 