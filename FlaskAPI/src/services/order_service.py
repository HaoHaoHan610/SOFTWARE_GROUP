from typing import List, Optional
from infrastructure.models.OrderModel import OrderModel
from infrastructure.repositories.Order_Repositories import OrderRepository
from domain.models.Order import Order
from datetime import datetime


class OrderService:
    def __init__(self, repository: OrderRepository):
        self.repository = repository

    def create_order(
        self,
        customer_id:int
    ) -> OrderModel:
        """Tạo Order mới"""
        order = Order(
            id = None,
            customer_id=customer_id
        )
        return self.repository.add(order=order)
    
    def get_all(self)->list[OrderModel]:
        return self.repository.get_all()

    def get_by_id(self, id: int) -> Optional[OrderModel]:
        return self.repository.get_by_id(id)

    def update(self,
               id:int,
               customer_id:Optional[int]=None,
               quantity:Optional[int]= None,
               status:Optional[str]=None,
               )->Optional[OrderModel]:
        
        order = self.repository.get_by_id(id=id)
        
        if not order:
            return None
        
        if customer_id is not None:
            order.customer_id = customer_id
        if quantity is not None:
            order.quantity=quantity
        if status is not None:
            order.status=status


        return self.repository.update(order=order)

    
    def delete(self, id: int):
        order = self.repository.get_by_id(id=id)
        if order:
            return self.repository.delete(order)
        return False
    

    
    def get_customer(self,customer_id:int)->list[OrderModel]:
        return self.repository.get_customer(customer_id)
    
    def status_change(self,id:int,status:str):
        return self.repository.status_change(id=id,new_status=status)
