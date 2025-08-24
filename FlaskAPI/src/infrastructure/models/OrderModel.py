from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from infrastructure.databases.base import BASE
from datetime import datetime

class OrderModel(BASE):
    __tablename__ = "Order"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)   # người mua
    status = Column(String(20), default="Pending")  # trạng thái đơn hàng
    created_at = Column(DateTime, default=datetime.utcnow)
    quantity = Column(Integer,default=0,nullable=False)