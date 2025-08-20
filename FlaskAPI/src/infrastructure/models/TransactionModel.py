from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float

class TransactionModel(BASE):
    __tablename__ = "Transaction"
    __table_args__ = {'extend_existing': True}

    Id = Column(Integer,primary_key=True)
    Price = Column(Float,nullable=False)
    Status = Column(String(80),nullable=False)
    Date = Column(DateTime,nullable=False)
