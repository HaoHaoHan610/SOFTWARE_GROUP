from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float,PrimaryKeyConstraint,Boolean

class OrderModel(BASE):
    __tablename__ = "Order"
    __table_args__ = (
        PrimaryKeyConstraint("User_Id", "Watch_Id"),
        {'extend_existing': True}
    )

    User_Id = Column(Integer, ForeignKey('User.Id'), nullable=False)
    Watch_Id = Column(Integer, ForeignKey('Watch.Id'), nullable=False)
    Quantity = Column(Integer, nullable=False)
    Total_Price = Column(Float, nullable=False, default=0.0)
    Status = Column(String(50), nullable=False, default="pending")
    Created_At = Column(DateTime, nullable=False)
    Updated_At = Column(DateTime, nullable=False)

