from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
 
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(100))
    family_name = Column(String(100))
    email       = Column(String(150), unique=True, index=True)
    username    = Column(String(100), unique=True, index=True)
    password    = Column(Text)
    address     = Column(Text)
    birth_date  = Column(Date)
    gender      = Column(String(20))
    created_at  = Column(DateTime, server_default=func.now())
 
    # relationships
    company_links       = relationship("UserCompany",        back_populates="user")
    created_projects    = relationship("Project",            back_populates="creator",        foreign_keys="Project.created_by")
    assigned_tasks      = relationship("Task",               back_populates="assignee",       foreign_keys="Task.assigned_to")
    authored_reports    = relationship("Report",             back_populates="author",         foreign_keys="Report.created_by")
    resource_assignments = relationship("ResourceAssignment", back_populates="user")
    skills              = relationship("UserSkill",          back_populates="user")
 