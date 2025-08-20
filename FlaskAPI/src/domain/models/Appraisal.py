from datetime import date

class Appraisal:
    def __init__(
        self,
        appraisal_id: int,
        watch_id: int,
        appraiser_id: int,
        date: date,
        value: float = None,
        status: str = None,
        comments: str = None,
        appraiser: object = None
    ):
        self.appraisal_id = appraisal_id
        self.watch_id = watch_id
        self.appraiser_id = appraiser_id
        self.value = value
        self.date = date
        self.status = status
        self.comments = comments
        self.appraiser = appraiser

