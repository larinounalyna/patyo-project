from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship
class Supplier(Base):
    __tablename__ = "suppliers"
 
    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String(150), nullable=False)
    initials     = Column(String(10))
    contact_info = Column(Text)
 
    # relationships
    resources = relationship("Resource", back_populates="supplier")
 