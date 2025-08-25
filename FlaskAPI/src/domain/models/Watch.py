from datetime import datetime

class Watch:
    def __init__(
        self,
        id: int,
        name: str,
        brand: str,
        price: float,
        created_at: datetime,
        seller_id:int,
        existing_status: bool = True
        # appraisal_report_id: int = None
    ):
        self.id = id
        self.name = name
        self.brand = brand
        self.price = price
        self.created_at = created_at
        self.seller_id = seller_id
        self.existing_status = existing_status
        # self.appraisal_report_id = appraisal_report_id
