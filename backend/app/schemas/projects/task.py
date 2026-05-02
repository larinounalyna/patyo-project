from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr
from .task_status import TaskStatusOut
from ..auth.user import UserOut

class TaskBase(BaseModel):
    title:       Optional[str] = None
    description: Optional[str] = None
    project_id:  Optional[int] = None
    status_id:   Optional[int] = None
    assigned_to: Optional[int] = None
 
class TaskCreate(TaskBase):
    title:      str
    project_id: int
 
class TaskUpdate(TaskBase):
    pass
 
class TaskOut(TaskBase):
    id:         int
    created_at: Optional[datetime] = None
    model_config = {"from_attributes": True}
 
class TaskWithDetails(TaskOut):
    status:   Optional["TaskStatusOut"] = None
    assignee: Optional["UserOut"] = None

TaskWithDetails.model_rebuild()
 