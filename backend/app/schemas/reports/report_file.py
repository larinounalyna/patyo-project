from __future__ import annotations
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, EmailStr

class ReportFileBase(BaseModel):
    file_url: str
 
class ReportFileCreate(ReportFileBase):
    report_id: int
 
class ReportFileOut(ReportFileBase):
    id:        int
    report_id: int
    model_config = {"from_attributes": True}