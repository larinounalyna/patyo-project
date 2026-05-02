from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__ = "roles"
 
    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)
 
    # relationships
    user_companies = relationship("UserCompany", back_populates="role")
 