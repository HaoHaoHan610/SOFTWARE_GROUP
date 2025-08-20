from datetime import date

class Order:
    def __init__(
        self,
        user_id: int,
        watch_id: int,
        quantity: int,
        total_price: float,
        status: str,
        created_at: date,
        updated_at: date
    ):
        self.user_id = user_id
        self.watch_id = watch_id
        self.quantity = quantity
        self.total_price = total_price
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at