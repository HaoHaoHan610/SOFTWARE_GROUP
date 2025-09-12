from datetime import datetime
from typing import Optional,List

class Feedback:
    def __init__(
        self,
        id: Optional[int]=None,
        sender_id: Optional[int]=None,
        receiver_id: Optional[int]=None,
        content: Optional[str] = None
    ):
        self.id=id,
        self.sender_id=sender_id,
        self.receiver_id=receiver_id
        self.content = content          
        self.created_at = datetime.utcnow()
