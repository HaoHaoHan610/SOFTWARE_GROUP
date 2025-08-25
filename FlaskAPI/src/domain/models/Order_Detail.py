class OrderDetail:
    def __init__(self, order_id: int, watch_id: int, quantity: int = 1):
        self.order_id = order_id
        self.watch_id = watch_id
        self.quantity = quantity