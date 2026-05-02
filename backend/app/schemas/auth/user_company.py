from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr
from app.schemas.auth.user import UserOut
from app.schemas.auth.company import CompanyOut
from app.schemas.auth.role import RoleOut

class UserCompanyBase(BaseModel):
    user_id:    int
    company_id: int
    role_id:    Optional[int] = None
 
class UserCompanyCreate(UserCompanyBase):
    pass
 
class UserCompanyUpdate(BaseModel):
    role_id: Optional[int] = None
 
class UserCompanyOut(UserCompanyBase):
    id:      int
    user:    Optional["UserOut"] = None
    company: Optional["CompanyOut"] = None
    role:    Optional["RoleOut"] = None

UserCompanyOut.model_rebuild()
UserCompanyOut.model_config = {"from_attributes": True}