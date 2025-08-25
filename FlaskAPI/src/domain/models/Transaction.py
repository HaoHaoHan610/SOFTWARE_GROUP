from datetime import date

class Transaction:
    def __init__(
        self,
        id: int,
        seller_id:int,
        buyer_id:int,
        price: float,
        status: str,
        date: date
    ):
        self.id = id
        sseller_id
        self.price = price
        self.status = status
        self.date = date