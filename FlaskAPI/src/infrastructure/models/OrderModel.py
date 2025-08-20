from infrastructure.databases.base import BASE
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float, PrimaryKeyConstraint

class OrderModel(BASE):
    __tablename__ = "Order"
    __table_args__ = (
        PrimaryKeyConstraint("user_id", "watch_id"),
        {'extend_existing': True}
    )

    user_id = Column(Integer, nullable=False)
    watch_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False, default=0.0)
    status = Column(String(50), nullable=False, default="pending")
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)