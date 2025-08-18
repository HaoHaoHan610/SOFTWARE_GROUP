class User:
    def __innit__(self, user_id: str ,user_name: str, password: str, description: str = None, status: bool = True):
        self.user_id = user_id
        self.user_name = user_name
        self.password = password
        self.description = description
        self.status = status
        self.created_at = None
        self.updated_at = None