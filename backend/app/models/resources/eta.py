from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ResourceETA(Base):
    __tablename__ = "resource_eta"
 
    id          = Column(Integer, primary_key=True, index=True)
    resource_id = Column(Integer, ForeignKey("resources.id", ondelete="CASCADE"))
    eta_date    = Column(Date)
    status_text = Column(String(100))
    sub_text    = Column(String(200))
 
    # relationships
    resource = relationship("Resource", back_populates="eta_entries")
 