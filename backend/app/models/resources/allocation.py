from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ResourceAllocation(Base):
    __tablename__ = "resource_allocations"
 
    id            = Column(Integer, primary_key=True, index=True)
    resource_id   = Column(Integer, ForeignKey("resources.id", ondelete="CASCADE"))
    project_id    = Column(Integer, ForeignKey("projects.id",  ondelete="CASCADE"))
    quantity_used = Column(Numeric)
    phase         = Column(String(100))   # structure, MEP, etc.
    status        = Column(String(50))    # deployed, reserved, returned
    assigned_at   = Column(DateTime, server_default=func.now())
 
    # relationships
    resource = relationship("Resource", back_populates="allocations")
    project  = relationship("Project",  back_populates="resource_allocations")
 
