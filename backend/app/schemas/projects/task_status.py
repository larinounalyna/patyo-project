from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class TaskStatusBase(BaseModel):
    name: str  # todo, in_progress, done
 
class TaskStatusCreate(TaskStatusBase):
    pass
 
class TaskStatusUpdate(BaseModel):
    name: Optional[str] = None
 
class TaskStatusOut(TaskStatusBase):
    id: int
    model_config = {"from_attributes": True}