from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ResourceAssignment(Base):
    __tablename__ = "resource_assignments"
 
    id          = Column(Integer, primary_key=True, index=True)
    resource_id = Column(Integer, ForeignKey("resources.id"))
    user_id     = Column(Integer, ForeignKey("users.id"))
    role        = Column(String(100))   # operator, supervisor
    start_time  = Column(DateTime)
    end_time    = Column(DateTime)
 
    # relationships
    resource = relationship("Resource", back_populates="assignments")
    user     = relationship("User",     back_populates="resource_assignments")
 