# domain/models/Appraisal.py
from datetime import datetime
from typing import Optional

class Appraisal:
    def __init__(
        self,
        id:int,
        appraiser_id: int,
        watch_id: int,
        es_value: float,
        status: str,
        auth: Optional[str] = None,
        con_note: Optional[str] = None,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
    ):
        self.id = id
        self.appraiser_id = appraiser_id
        self.watch_id = watch_id
        self.es_value = es_value
        self.status = status
        self.auth = auth
        self.con_note = con_note
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
