from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, Boolean, DateTime

class UserModel(BASE):
    __tablename__ = "User"
    # tablename indentified supports session to recognize in database
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    created_at = Column(DateTime, nullable=False)