from infrastructure.databases.base import BASE
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float

class FeedbackModel(BASE):
    __tablename__ = "Feedback"
    __table_args__ = {'extend_existing': True}

    Id = Column(Integer, primary_key=True, nullable=False)
    Watch_Id = Column(Integer, ForeignKey("Watch.Id"), primary_key=True, nullable=False)
    Comment = Column(String(255), nullable=True)
    Rating = Column(Float, nullable=True)
    Created_At = Column(DateTime, nullable=False)

