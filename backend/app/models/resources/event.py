from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class ResourceEvent(Base):
    __tablename__ = "resource_events"
 
    id          = Column(Integer, primary_key=True, index=True)
    resource_id = Column(Integer, ForeignKey("resources.id", ondelete="CASCADE"))
    event_type  = Column(String(50))    # maintenance, inspection, deployment, shipment
    progress    = Column(Integer)       # 0–100
    note        = Column(Text)
    event_date  = Column(DateTime, server_default=func.now())
 
    # relationships
    resource = relationship("Resource", back_populates="events")
 