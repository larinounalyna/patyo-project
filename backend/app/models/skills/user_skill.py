from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class UserSkill(Base):
    __tablename__ = "user_skills"
    __table_args__ = (UniqueConstraint("user_id", "skill_id"),)
 
    user_id  = Column(Integer, ForeignKey("users.id"),  primary_key=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), primary_key=True)
 
    # relationships
    user  = relationship("User",  back_populates="skills")
    skill = relationship("Skill", back_populates="user_skills")