from datetime import datetime

class Watch:
    def __init__(
        self,
        watch_id: int,
        name: str,
        brand: str,
        price: float,
        created_at: datetime,
        appraisal_report: int = None
    ):
        self.watch_id = watch_id
        self.name = name
        self.brand = brand
        self.price = price
        self.created_at = created_at
        self.appraisal_report = appraisal_report