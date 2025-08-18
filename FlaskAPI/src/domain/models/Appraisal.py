from datetime import date

class Appraisal:
    def __init__(self, Appraisal_id: str, Watch_id: str,
                 Appraiser_id: str, date: date, value: float = None):
        self.Appraisal_id = Appraisal_id
        self.Watch_id = Watch_id
        self.Appraiser_id = Appraiser_id
        self.value = value
        self.date = date
        self.status = None
        self.comments = None
        self.appraiser = None

        