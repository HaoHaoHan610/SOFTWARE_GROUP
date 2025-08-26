
from typing import List, Optional
from datetime import datetime

class Order:
    def __init__(self, id: int, customer_id: int, status: str = "Pending",quantity:int=0, created_at: Optional[datetime] = None,updated_at:Optional[datetime]=None,address:Optional[str]=None):
        self.id = id
        self.customer_id = customer_id
        self.status = status
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
        self.address = address
        self.quantity = quantity