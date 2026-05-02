from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Report(Base):
    __tablename__ = "reports"
 
    id             = Column(Integer, primary_key=True, index=True)
    project_id     = Column(Integer, ForeignKey("projects.id",      ondelete="CASCADE"))
    report_type_id = Column(Integer, ForeignKey("report_types.id"))
    title          = Column(String(200))
    content        = Column(Text)
    report_date    = Column(Date)
    created_at     = Column(DateTime, server_default=func.now())
    created_by     = Column(Integer, ForeignKey("users.id",         ondelete="SET NULL"), nullable=True)
 
    # relationships
    project     = relationship("Project",    back_populates="reports")
    report_type = relationship("ReportType", back_populates="reports")
    author      = relationship("User",       back_populates="authored_reports", foreign_keys=[created_by])
    files       = relationship("ReportFile", back_populates="report")
 