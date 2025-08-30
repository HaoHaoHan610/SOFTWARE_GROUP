from datetime import date
from typing import Optional,List

class User:
    def __init__(
        self,
        id: int,
        username: Optional[str]=None,
        email: Optional[str]=None,
        password: Optional[str]=None,
        created_at: Optional[date]=None,
        role: Optional[str]=None
    ):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.created_at = created_at
        self.role = role
        # self.address = address
