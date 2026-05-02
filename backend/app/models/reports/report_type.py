from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ReportType(Base):
    __tablename__ = "report_types"
 
    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)   # daily, meeting
 
    # relationships
    reports = relationship("Report", back_populates="report_type")
 