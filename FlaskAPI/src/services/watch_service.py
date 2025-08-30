from infrastructure.repositories.Watch_Repositories import WatchRepository
from domain.models.Watch import Watch
from datetime import datetime
from typing import Optional

class WatchService:
    def __init__(self, repository: WatchRepository):
        self.repository = repository

    def create_watch(self, name: str, brand: str, price: float,
                     created_at: Optional[datetime] = None,
                     seller_id:Optional[int]=None,
                     img:Optional[str]=None,
                    #  appraisal_report_id: Optional[int] = None,
                     existing_status: bool = True):
        if created_at is None:
            created_at = datetime.utcnow()
        watch = Watch(
            id=None,
            seller_id=seller_id,
            name=name,
            brand=brand,
            price=price,
            created_at=created_at,
            img = img,
            # appraisal_report_id=appraisal_report_id,
            existing_status=existing_status
        )
        return self.repository.add(watch)

    def get_watch(self, id: int):
        return self.repository.get_by_id(id)

    def update(self, id: int,
        name: Optional[str] = None,
        brand: Optional[str] = None,
        price: Optional[float] = None,
        existing_status: Optional[bool] = None,
        seller_id:Optional[int]=None,
        img :Optional[str]=None,
        created_at: Optional[datetime] = None):#,
        #appraisal_report_id: Optional[int] = None):
    
        watch = Watch(
            id=id,
            seller_id=seller_id,
            name=name,
            brand=brand,
            price=price,
            img=img,
            created_at=created_at,
            # appraisal_report_id=appraisal_report_id,
            existing_status=existing_status
        )
        return self.repository.update(watch)

    def list(self):
        return self.repository.get_all_watch()

    def delete(self, id: int) -> None:
        return self.repository.delete(id)
    
    def get_seller(self,seller_id:int):
        return self.repository.get_by_seller(seller_id=seller_id)
