from datetime import date
class User:
    def __init__(
        self,
        user_id: int,
        username: str,
        email: str,
        password: str,
        created_at: date,
    ):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.password = password
        self.created_at = created_at
