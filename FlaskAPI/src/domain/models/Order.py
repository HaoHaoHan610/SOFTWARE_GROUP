from Order_Detail import OrderDetail
from typing import List, Optional
from datetime import datetime

class Order:
    def __init__(self, id: int, customer_id: int, status: str = "Pending", created_at: Optional[datetime] = None,updated_at:Optional[datetime]=None):
        self.id = id
        self.customer_id = customer_id
        self.status = status
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
        self.items: List[OrderDetail] = []  
        self.quantity = len(self.items)

    def add_item(self, item: OrderDetail):
        self.items.append(item)
        self.quantity+=1