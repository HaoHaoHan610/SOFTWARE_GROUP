from typing import List,Optional
class OrderDetail:
    def __init__(self, order_id: Optional[int]=None, watch_id: Optional[int]=None, quantity: int = 1):
        self.order_id = order_id
        self.watch_id = watch_id
        self.quantity = quantity