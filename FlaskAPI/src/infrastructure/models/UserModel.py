from infrastructure.databases.base import BASE
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime

class UserModel(BASE):
    __tablename__ = "User"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    created_at = Column(DateTime, nullable=False)
    role = Column(String(50), nullable=False)
    # address = Column(String(255),nullable=False)
    # orders = relationship("Order", back_populates="order")
