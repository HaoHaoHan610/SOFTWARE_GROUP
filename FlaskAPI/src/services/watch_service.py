from infrastructure.models.WatchModel import WatchModel
from infrastructure.repositories.Watch_Repositories import WatchRepository
from domain.models.Watch import Watch
from datetime import datetime
from typing import Optional,List


# id = Column(Integer, primary_key=True, nullable=False)
#     name = Column(String(100), nullable=False)
#     brand = Column(String(100), nullable=False)
#     price = Column(Float, nullable=False)
#     created_at = Column(DateTime, nullable=False)
#     appraisal_report_id = Column(Integer)

class WatchService:
    def __init__(self, repository : WatchRepository):
        self.repository = repository
    
    def create_watch(self,name: str, brand: str, price: float,created_at: Optional[datetime]=None,appraisal_report_id: Optional[int] = None) -> WatchModel:
        if created_at is None:
            created_at = datetime.utcnow()
        watch = WatchModel(
            name = name,
            brand=brand,
            price=price,
            created_at= created_at,
            appraisal_report_id= appraisal_report_id
        )
        return self.repository.add(watch)
    
    def get_watch(self,id: int):
        return self.repository.get_by_id(id)
    
    def update(self,id:int,name: str, brand: str, price: float,created_at: Optional[datetime]=None,appraisal_report_id: Optional[int] = None) -> WatchModel:
        watch = Watch(
            id = id,
            name = name,
            brand=brand,
            price=price,
            created_at= created_at,
            appraisal_report_id= appraisal_report_id
        )

        if not watch:
            return None
        if name is not None:
            watch.name = name
        if brand is not None:
            watch.brand= brand
        if price is not None:
            watch.price = price
        if appraisal_report_id is not None:
            watch.appraisal_report_id = appraisal_report_id
            
        return self.repository.update(watch)
    
    def list(self):
        return self.repository.get_all_watch()
    
    def delete(self,id: int) -> None:
        return self.repository.delete(id)
