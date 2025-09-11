from typing import List, Optional
from infrastructure.models.Order_DetailModel import OrderDetailModel
from infrastructure.repositories.Order_Detail_Repositories import OrderDetail_Repository
from domain.models.Order_Detail import OrderDetail
from datetime import datetime


class Order_Detail_Service:
    def __init__(self, repository: OrderDetail_Repository):
        self.repository = repository

    def create_order_detail(
        self,
        order_id:int,
        watch_id:int,
        quantity:int = 1
    ) -> OrderDetailModel:
        """Tạo Order_detail mới"""
        detail = OrderDetail(
            order_id=order_id,
            watch_id=watch_id,
            quantity=quantity
        )
        return self.repository.add(detail)
    
    def get_all(self)->list[OrderDetailModel]:
        return self.repository.get_all()

    # def get_by_id(self, id: int) -> Optional[OrderDetailModel]:
    #     return self.repository.get_by_id(id)

    def get_order_watch(self, order_id: int,watch_id:int):
        return self.repository.get_by_order_watch(order_id=order_id,watch_id=watch_id)

    def get_all_order(self,order_id:int) -> List[OrderDetailModel]:
        return self.repository.get_all_order(order_id=order_id)

    def update(self,
               order_id:Optional[int]=None,
               watch_id:Optional[int]=None
               )->Optional[OrderDetailModel]:
        
        detail = self.repository.get_by_order_watch(order_id=order_id,watch_id=watch_id)

        return self.repository.update(detail)

    
    def delete_order(self, id:int):
        return self.repository.delete_order(order_id=id)

    def delete_order_watch(self,order_id:int,watch_id:int):
        detail = self.repository.get_by_order_watch(order_id=order_id,watch_id=watch_id)
        return self.repository.delete_by_order_and_watch(detail=detail)
    

