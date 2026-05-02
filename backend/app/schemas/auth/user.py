from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

from app.schemas.skills.skill import SkillOut  # ✅ REAL IMPORT (no string)

class UserBase(BaseModel):
    name: Optional[str] = None
    family_name: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    address: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[str] = None


class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserOut(UserBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class UserWithSkills(UserOut):
    skills: List[SkillOut] = []   # ✅ NO STRING ANYMORE