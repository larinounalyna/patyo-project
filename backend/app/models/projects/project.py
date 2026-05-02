from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Project(Base):
    __tablename__ = "projects"
 
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(200))
    description = Column(Text)
    company_id  = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"))
    created_at  = Column(DateTime, server_default=func.now())
    created_by  = Column(Integer, ForeignKey("users.id",     ondelete="CASCADE"))
 
    # relationships
    company              = relationship("Company",            back_populates="projects")
    creator              = relationship("User",               back_populates="created_projects", foreign_keys=[created_by])
    tasks                = relationship("Task",               back_populates="project")
    reports              = relationship("Report",             back_populates="project")
    resource_allocations = relationship("ResourceAllocation", back_populates="project")
 