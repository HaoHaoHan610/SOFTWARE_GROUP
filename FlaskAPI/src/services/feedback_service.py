from infrastructure.models.FeedbackModel import FeedbackModel
from infrastructure.repositories.Feedback_Repositories import FeedbackRepository
from domain.models.Feedback import Feedback
from datetime import datetime
from typing import Optional

class FeedbackService:
    def __init__(self, repository: FeedbackRepository):
        self.repository = repository

    def get_all(self):
        return self.repository.get_all()

    def create_feedback(self, sender_id:int,receiver_id:int,content:str) -> FeedbackModel:

        feedback = Feedback(
            id=None,
            sender_id=sender_id,
            receiver_id=receiver_id,
            content=content,
        )
        return self.repository.add(feedback=feedback)

    def get_feedback(self, id: int):
        return self.repository.get_by_id(id=id)

    def update(self, id: int, sender_id: Optional[int] = None, receiver_id: Optional[int] = None, content: Optional[str] = None):
        feedback = Feedback(
            id=id,
            sender_id=sender_id,
            receiver_id=receiver_id,
            content=content
        )

        return self.repository.update(feedback)

    def list(self):
        return self.repository.get_all_user()

    def delete(self, id: int) -> None:
        self.repository.delete(id)

    def get_feedback_agent(self):
        return self.repository.get_feedback_for_agent()
