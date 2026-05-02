from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Task(Base):
    __tablename__ = "tasks"
 
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String(200))
    description = Column(Text)
    project_id  = Column(Integer, ForeignKey("projects.id",    ondelete="CASCADE"))
    status_id   = Column(Integer, ForeignKey("task_status.id"))
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_at  = Column(DateTime, server_default=func.now())
 
    # relationships
    project  = relationship("Project",    back_populates="tasks")
    status   = relationship("TaskStatus", back_populates="tasks")
    assignee = relationship("User",       back_populates="assigned_tasks", foreign_keys=[assigned_to])
 