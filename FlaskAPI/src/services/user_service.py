from infrastructure.models.UserModel import UserModel
from infrastructure.repositories.User_Repositories import UserRepository
from domain.models.User import User
from datetime import datetime
from typing import Optional

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def create_user(self, username: str, email: str, password: str, role: str,address:str) -> UserModel:
        
        created_at = datetime.utcnow()

        user = User(
            id=None,
            username=username,
            email=email,
            password=password,
            created_at=created_at,
            role=role,
            address=address
        )
        return self.repository.add(user)

    def get_user(self, id: int):
        return self.repository.get_by_id(id)

    def update(self, id: int, username: Optional[str] = None, email: Optional[str] = None,
               password: Optional[str] = None, role: Optional[str] = None,address:Optional[str]=None):
        user = User(
            id=id,
            username=username,
            email=email,
            password=password,
            role=role,
            address=address
        )
        return self.repository.update(user)

    def list(self):
        return self.repository.get_all_user()

    def delete(self, id: int) -> None:
        self.repository.delete(id)
