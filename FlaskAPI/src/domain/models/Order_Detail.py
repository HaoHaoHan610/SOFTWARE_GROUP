class OrderDetail:
    def __init__(self, id: int, order_id: int, watch_id: int, price: float, quantity: int = 1):
        self.id = id
        self.order_id = order_id
        self.watch_id = watch_id
        self.price = price
        # self.quantity = quantity