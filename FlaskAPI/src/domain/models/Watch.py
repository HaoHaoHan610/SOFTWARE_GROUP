
from datetime import date

class Watch:
    def __init__(self, Watch_id:int, brand:str, date: date, condition:str, price:str,):
        self.Watch_id = Watch_id
        self.brand = brand
        self.date = date
        self.condition = condition
        self.price = price
        self.appraisal_report = None