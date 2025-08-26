from datetime import datetime

class Transaction:
    def __init__(self, id: int, buyer_id: int, seller_id: int, order_id: int, amount: float,
                 status: str = "pending", created_at: datetime = None):
        self.id = id
        self.buyer_id = buyer_id
        self.seller_id = seller_id
        self.order_id = order_id
        self.amount = amount
        self.status = status
        self.created_at = created_at or datetime.utcnow()


class Escrow:
    def __init__(self, id: int, transaction_id: int, amount: float,
                 status: str = "holding", created_at: datetime = None, released_at: datetime = None):
        self.id = id
        self.transaction_id = transaction_id
        self.amount = amount
        self.status = status
        self.created_at = created_at or datetime.utcnow()
        self.released_at = released_at
