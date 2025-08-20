from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float,PrimaryKeyConstraint,Boolean

class OrderModel(BASE):
    __tablename__ = "Order"
    __table_args__ = (
        PrimaryKeyConstraint("User_Id", "Watch_Id"),
        {'extend_existing': True}
    )

    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    watch_Id = Column(Integer, ForeignKey('Watch.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_Price = Column(Float, nullable=False, default=0.0)
    status = Column(String(50), nullable=False, default="pending")
    created_At = Column(DateTime, nullable=False)
    updated_At = Column(DateTime, nullable=False)

