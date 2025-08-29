from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from infrastructure.databases.base import BASE
from datetime import datetime

class OrderModel(BASE):
    __tablename__ = "Order"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, nullable=False)   # người mua
    status = Column(String(20), default="Pending")  # trạng thái đơn hàng
    created_at = Column(DateTime, default=datetime.utcnow())
    updated_at = Column(DateTime,nullable=False)
    quantity = Column(Integer,default=0,nullable=False)
    address = Column(String(255),nullable=False)
    amount = Column(DECIMAL(18,2),default=0.0,nullable=False)

    details = relationship("OrderDetailModel", back_populates="order")