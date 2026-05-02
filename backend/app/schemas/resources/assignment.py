from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr
from ..auth.user import UserOut

class ResourceAssignmentBase(BaseModel):
    resource_id: int
    user_id:     int
    role:        Optional[str] = None    # operator, supervisor
    start_time:  Optional[datetime] = None
    end_time:    Optional[datetime] = None
 
class ResourceAssignmentCreate(ResourceAssignmentBase):
    pass
 
class ResourceAssignmentUpdate(BaseModel):
    role:       Optional[str] = None
    start_time: Optional[datetime] = None
    end_time:   Optional[datetime] = None
 
class ResourceAssignmentOut(ResourceAssignmentBase):
    id:   int
    user: Optional["UserOut"] = None
    model_config = {"from_attributes": True}

ResourceAssignmentOut.model_rebuild()