from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float

class TransactionModel(BASE):
    __tablename__ = "Transaction"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer,primary_key=True)
    price = Column(Float,nullable=False)
    status = Column(String(80),nullable=False)
    date = Column(DateTime,nullable=False)
    order_id = Column(Integer,nullable=False)
