from app.models.base import Base
from sqlalchemy import (
    Column, Integer, String, Text, Date, DateTime, Numeric,
    ForeignKey, UniqueConstraint, func
)
from sqlalchemy.orm import relationship

class UserCompany(Base):
    __tablename__ = "user_company"
 
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id",     ondelete="CASCADE"))
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"))
    role_id    = Column(Integer, ForeignKey("roles.id"))
 
    # relationships
    user    = relationship("User",    back_populates="company_links")
    company = relationship("Company", back_populates="user_links")
    role    = relationship("Role",    back_populates="user_companies")
 