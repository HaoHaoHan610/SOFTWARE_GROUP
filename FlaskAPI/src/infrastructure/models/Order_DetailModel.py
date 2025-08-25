from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL,Float
from sqlalchemy.orm import relationship
from infrastructure.databases.base import BASE
from datetime import datetime

class OrderDetailModel(BASE):
    __tablename__ = "OrderDetail"
    __table_args__ = {'extend_existing': True}

    # id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Order.id"), primary_key=True, nullable=False)
    watch_id = Column(Integer,ForeignKey("Watch.id"),primary_key=True ,nullable=False)
    quantity = Column(Integer,default=1)

    watch = relationship("WatchModel", back_populates="order_details")
    order = relationship("OrderModel", back_populates="details")
    
    # price = Column(Float nullable=False)
    # quantity = Column(Integer, default=1)
    # watch = relationship("WatchModel")  # liên kết tới Watch

    # @property
    # def price(self):
    #     # price luôn lấy từ Watch hiện tại
    #     return self.watch.price