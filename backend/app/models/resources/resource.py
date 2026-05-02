from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Resource(Base):
    __tablename__ = "resources"
 
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(200), nullable=False)
    type        = Column(String(50),  nullable=False)   # equipment, material, tool
    code        = Column(String(100))                   # EQ-7821 / PO code
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    quantity    = Column(Numeric)
    unit        = Column(String(50))                    # tons, unit, m3
    status      = Column(String(50))                    # ON_SITE, IN_TRANSIT, ORDERED, MAINTENANCE, AVAILABLE
    created_at  = Column(DateTime, server_default=func.now())
 
    # relationships
    supplier    = relationship("Supplier",           back_populates="resources")
    allocations = relationship("ResourceAllocation", back_populates="resource")
    events      = relationship("ResourceEvent",      back_populates="resource")
    eta_entries = relationship("ResourceETA",        back_populates="resource")
    assignments = relationship("ResourceAssignment", back_populates="resource")
 