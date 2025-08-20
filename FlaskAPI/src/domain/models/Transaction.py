from datetime import date

class Transaction:
    def __init__(
        self,
        id: int,
        price: float,
        status: str,
        date: date
    ):
        self.id = id
        self.price = price
        self.status = status
        self.date = date