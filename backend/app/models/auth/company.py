from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship

class Company(Base):
    __tablename__ = "companies"
 
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(150))
    image      = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
 
    # relationships
    user_links = relationship("UserCompany", back_populates="company")
    projects   = relationship("Project",     back_populates="company")