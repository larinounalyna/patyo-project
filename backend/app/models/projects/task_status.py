from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class TaskStatus(Base):
    __tablename__ = "task_status"
 
    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)   # todo, in_progress, done
 
    # relationships
    tasks = relationship("Task", back_populates="status")
 