from infrastructure.databases.base import BASE
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float

class FeedbackModel(BASE):
    __tablename__ = "Feedback"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    watch_Id = Column(Integer, ForeignKey("Watch.id"), primary_key=True, nullable=False)
    comment = Column(String(255), nullable=True)
    rating = Column(Float, nullable=True)
    created_At = Column(DateTime, nullable=False)

