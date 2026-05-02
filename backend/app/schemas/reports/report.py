from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, EmailStr
from .report_type import ReportTypeOut
from ..auth.user import UserOut
from .report_file import ReportFileOut

class ReportBase(BaseModel):
    title:          Optional[str] = None
    content:        Optional[str] = None
    report_date:    Optional[date] = None
    project_id:     Optional[int] = None
    report_type_id: Optional[int] = None
 
class ReportCreate(ReportBase):
    title:          str
    project_id:     int
    report_type_id: int
    created_by:     int
 
class ReportUpdate(ReportBase):
    pass
 
class ReportOut(ReportBase):
    id:         int
    created_by: Optional[int] = None
    created_at: Optional[datetime] = None
    model_config = {"from_attributes": True}
 
class ReportWithDetails(ReportOut):
    report_type: Optional["ReportTypeOut"] = None
    author:      Optional["UserOut"] = None
    files:       List["ReportFileOut"] = []

ReportWithDetails.model_rebuild()