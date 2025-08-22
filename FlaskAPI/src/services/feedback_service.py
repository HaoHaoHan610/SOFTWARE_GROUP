from typing import List,Optional
from datetime import datetime
from infrastructure.models.FeedbackModel import FeedbackModel
from infrastructure.repositories.feedbackRepositories import FeedbackRepository
from api.schemas.feedbackSchema import FeedbackRequestSchema,FeedbackResponseSchema

class FeedbackService:
    def __init__(self,repo:Optional[FeedbackRepository]=None):
        self.repo=repo or FeedbackRepository()

    def create_feedback(self,data:int)->dict:
        """Tạo mới feedback"""
        req_schema=FeedbackRequestSchema()
        validated=req_schema.load(data)

        feedback=FeedbackModel(
            watch__Id=validated["watch_Id"],
            comment=validated.get("comment"),
            rating=validated.get("rating"),
            created_At=datetime.utcnow()
        )

        saved=self.repo.add(feedback)

        res_schema=FeedbackResponseSchema()
        return res_schema.dump(saved)
    
    def get_feedback(self,id:int,watch_id:int)->Optional[dict]:
        """Lấy feedback theo id và watch_id"""
        fb=self.repo.get_by_id(id,watch_id)
        if not fb:
            return None
        res_schema=FeedbackResponseSchema()
        return res_schema.dump(fb)
    
    def get_all_feedback(self)->List[dict]:
        """Lấy tất cả feedback"""
        feedbacks=self.repo.get_all()
        res_schema=FeedbackResponseSchema(many=True)
        return res_schema.dump(feedbacks)
    
    def update_feedback(self,data:dict)->Optional[dict]:
        """cập nhạt feedback"""
        req_schema=FeedbackRequestSchema(partial=True)
        validated=req_schema.load(data)

        feedback=FeedbackModel(
            id=validated["id"],
            watch_Id=validated["watch_Id"],
            comment=validated.get("comment"),
            rating=validated.get("rating"),
            created_At=validated.get("created_At",datetime.utcnow())
        )
        updated=self.repo.update(feedback)
        if not updated:
            return None
        
        res_schema=FeedbackResponseSchema()
        return res_schema.dump(updated)
    
    def delete_feedback(self, id: int, watch_id: int) -> bool:
        """Xóa feedback"""
        return self.repo.delete(id, watch_id)

    def get_feedback_by_watch(self, watch_id: int) -> List[dict]:
        """Lấy tất cả feedback theo watch_id"""
        feedbacks = self.repo.get_by_watch_id(watch_id)
        res_schema = FeedbackResponseSchema(many=True)
        return res_schema.dump(feedbacks)

    def get_feedback_by_rating(self, rating: float) -> List[dict]:
        """Lấy tất cả feedback có rating = giá trị"""
        feedbacks = self.repo.get_by_rating(rating)
        res_schema = FeedbackResponseSchema(many=True)
        return res_schema.dump(feedbacks)

    def average_rating(self, watch_id: int) -> float:
        """Tính trung bình rating của một watch"""
        return self.repo.average_rating(watch_id)
