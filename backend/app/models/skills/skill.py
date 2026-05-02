from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Skill(Base):
    __tablename__ = "skills"
 
    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
 
    # relationships
    user_skills = relationship("UserSkill", back_populates="skill")
 