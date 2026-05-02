from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ReportFile(Base):
    __tablename__ = "report_files"
 
    id        = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("reports.id", ondelete="CASCADE"))
    file_url  = Column(Text)
 
    # relationships
    report = relationship("Report", back_populates="files")
 
 