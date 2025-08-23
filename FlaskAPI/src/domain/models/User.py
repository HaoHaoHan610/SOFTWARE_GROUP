from datetime import date

class User:
    def __init__(
        self,
        id: int,
        username: str,
        email: str,
        password: str,
        created_at: date,
        role: str
    ):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.created_at = created_at
        self.role = role
