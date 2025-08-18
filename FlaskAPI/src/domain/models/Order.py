from datetime import datetime

class Order:
    def __init__(
        self,
        order_id: int,
        user_id: str,         # Reference to User.user_id (buyer)
        watch_id: int,        # Reference to Watch.Watch_id
        quantity: int = 1,
        total_price: float = 0.0,
        status: str = "pending",
        created_at: datetime = None,
        updated_at: datetime = None
    ):
        self.order_id = order_id
        self.user_id = user_id
        self.watch_id = watch_id
        self.quantity = quantity
        self.total_price = total_price
        self.status = status
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()