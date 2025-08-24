from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL,Float
from sqlalchemy.orm import relationship
from infrastructure.databases.base import BASE
from datetime import datetime

class OrderDetailModel(BASE):
    __tablename__ = "OrderDetail"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Order.id"), nullable=False)
    watch_id = Column(Integer, ForeignKey("Watch.id"),nullable=False)
    # price = Column(DECIMAL(18, 2), nullable=False)
    # quantity = Column(Integer, default=1)
    watch = relationship("WatchModel")  # liên kết tới Watch

    @property
    def price(self):
        # price luôn lấy từ Watch hiện tại
        return self.watch.price