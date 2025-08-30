from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.FeedbackModel import FeedbackModel
from infrastructure.models.UserModel import UserModel
from domain.models.Feedback import Feedback
from typing import List, Optional
from datetime import datetime

class FeedbackRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, feedback: Feedback) -> FeedbackModel:
        """Thêm feedack mới"""
        try:
            feedbackobj = FeedbackModel(
                sender_id=feedback.sender_id,
                receiver_id = feedback.receiver_id,
                content=  feedback.content,
                created_at = feedback.created_at
            )
            self.session.add(feedbackobj)
            self.session.commit()
            self.session.refresh(feedbackobj)
            return feedbackobj
        finally:
            self.session.close()

    def get_by_id(self, id: int):
        return self.session.query(FeedbackModel).filter_by(id=id).first()

    def get_all(self) -> List[FeedbackModel]:
        """Lấy tất cả appraisal"""
        return self.session.query(FeedbackModel).all()

    def update(self, feedback: Feedback) -> Optional[FeedbackModel]:
        """Cập nhật appraisal"""
        try:
            feedbackobj = self.get_by_id(feedback.id)

            if not feedbackobj:
                return None

            if feedback.sender_id is not None:
                feedbackobj.sender_id = feedback.sender_id
            if feedback.receiver_id is not None:
                feedbackobj.receiver_id = feedback.receiver_id
            if feedback.content is not None:
                feedbackobj.content = feedback.content

            self.session.commit()
            self.session.refresh(feedbackobj)
            return feedbackobj
        except Exception:
            self.session.rollback()
            raise ValueError("Feedback not found or update failed")
        finally:
            self.session.close()


    def delete(self, id:int) -> bool:
        """Xóa appraisal"""
        try:
            feedback = self.get_by_id(id=id)
            if feedback:
                self.session.delete(feedback)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close() 

    def get_by_receiver_id(self, receiver_id: int) -> List[Feedback]:
        """Lấy tất cả appraisal của một watch"""
        return self.session.query(Feedback).filter_by(receiver_id=receiver_id).all()
    
    def get_feedback_for_agent(self) -> List[FeedbackModel]:
        return (
            self.session.query(FeedbackModel)
            .join(UserModel, FeedbackModel.receiver_id == UserModel.id)
            .filter(UserModel.role == 'agent')
            .all()
        ) 
