from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, Boolean, DateTime

class UserModel(BASE):
    __tablename__ = "User"
    __table_args__ = {'extend_existing': True}

    Id = Column(Integer, primary_key=True, nullable=False)
    Username = Column(String(50), nullable=False, unique=True)
    Email = Column(String(100), nullable=False, unique=True)
    Password = Column(String(200), nullable=False)
    Created_At = Column(DateTime, nullable=False)