from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, DateTime,ForeignKey,Float,Boolean
from sqlalchemy.orm import relationship

class WatchModel(BASE):
    __tablename__ = "Watch"
    __table_args__ = {'extend_existing': True}
    # replace the first one

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    brand = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False)
    # appraisal_report_id = Column(Integer,None)
    existing_status = Column(Boolean,default=True,nullable=False)
    seller_id = Column(Integer,ForeignKey("User.id"),nullable=False)

    order_details = relationship("OrderDetailModel", back_populates="watch")