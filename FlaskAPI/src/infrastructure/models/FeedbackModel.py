from infrastructure.databases.base import BASE
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float

class FeedbackModel(BASE):
    __tablename__ = "Feedback"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    sender_id = Column(Integer,ForeignKey("User.id"),nullable=False)
    receiver_id = Column(Integer,ForeignKey("User.id"),nullable=False)
    content = Column(String(255),nullable=False)
    created_at = Column(DateTime,nullable=False)


# self.id=id,
# self.sender_id=sender_id,
# self.receiver_id=receiver_id      # Reference to Watch.Watch_id
# self.comment = comment          # e.g., 1-5 stars
# self.created_at = created_at