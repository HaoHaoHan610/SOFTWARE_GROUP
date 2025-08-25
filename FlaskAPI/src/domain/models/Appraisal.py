# domain/models/Appraisal.py
from datetime import datetime
from typing import Optional

class Appraisal:
    def __init__(
        self,
        id:Optional[int]=None,
        appraiser_id: Optional[int]=None,
        watch_id: Optional[int]=None,
        es_value: Optional[float]=None,
        status: Optional[str]=None,
        auth: Optional[str] = None,
        con_note: Optional[str] = None,
        # created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
    ):
        self.id = id
        self.appraiser_id = appraiser_id
        self.watch_id = watch_id
        self.es_value = es_value
        self.status = status
        self.auth = auth
        self.con_note = con_note
        self.created_at = datetime.utcnow()
        self.updated_at = updated_at
