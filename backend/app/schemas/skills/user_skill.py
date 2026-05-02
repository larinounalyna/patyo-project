from pydantic import BaseModel
from typing import Optional

from app.schemas.skills.skill import SkillOut  # ✅ direct import

class UserSkillBase(BaseModel):
    user_id: int
    skill_id: int

class UserSkillCreate(UserSkillBase):
    pass

class UserSkillOut(UserSkillBase):
    skill: Optional[SkillOut] = None

    model_config = {"from_attributes": True}