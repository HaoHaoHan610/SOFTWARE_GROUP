from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.FeedbackModel import FeedbackModel
from typing import List,Optional
from datetime import datetime

class FeedbackRepository:
    def __init__(self,session:Session=session):
        self.session=session

    def add(self,feedback:FeedbackModel)->FeedbackModel:
        """Thêm một feedback mới"""
        try:
            self.session.add(feedback)
            self.session.commit()
            self.session.refresh(feedback)
            return feedback
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
    
    def get_by_id(self,id:int,watch_id:int)->Optional[FeedbackModel]:
        """Lấy feedback theo cặp khóa chính (id,watch_id)"""
        return self.session.query(FeedbackModel).filter_by(id=id,watch_Id=watch_id).first()
    
    def get_all(self)->List[FeedbackModel]:
        """Lấy tất cả feedback"""
        return self.session.query(FeedbackModel).all()
    
    def update(self,feedback:FeedbackModel)->Optional[FeedbackModel]:
        """Cập nhật feedback theo (id+watch_Id)"""
        try:
            self.session.merge(feedback)
            self.session.commit()
            return feedback
        except Exception:
            self.session.rollback()
            raise ValueError("Feedback not found or update failed")
        finally:
            self.session.close()

    def delete(self,id:int,watch_id:int)->bool:
        """Xóa feedback theo cặp khóa chính"""
        try:
            feedback=self.get_by_id(id,watch_id)
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

    def get_by_watch_id(self,watch_id:int)->List[FeedbackModel]:
        """Lấy tất cả feedback của một watch"""
        return self.session.query(FeedbackModel).filter_by(watch_Id=watch_id).all()
    
    def get_by_rating(self,rating:float)->List[FeedbackModel]:
        """Lấy tất cả feedback bằng rating"""
        return self.session.query(FeedbackModel).filter_by(rating=rating).all()
    
    def update_comment(self,id:int,watch_id:int,new_comment:str)->Optional[FeedbackModel]:
        """Cập nhật comment"""
        try:
            feedback=self.get_by_id(id,watch_id)
            if not feedback:
                return None
            feedback.comment=new_comment
            self.session.commit()
            self.session.refresh(feedback)
            return feedback
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

    def average_rating(self,watch_id:int)->float:
        """Tính trung bình rating cho một watch"""
        feedbacks=self.get_by_watch_id(watch_id)
        if not feedbacks:
            return 0
        ratings=[fb.rating for fb in feedbacks if fb.rating is not None]
        return sum(ratings)/len(ratings) if ratings else 0
