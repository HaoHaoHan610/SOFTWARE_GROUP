from infrastructure.models.UserModel import UserModel
from infrastructure.repositories.User_Repositories import UserRepository
from domain.models.User import User
from datetime import datetime
from typing import Optional,List

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository
    
    def create_user(self, username: str, email: str, password:str, created_at:Optional[datetime] = None) -> UserModel:
        if created_at is None:
            created_at = datetime.utcnow()

        user = UserModel(
            id=None,
            username=username, 
            email=email,
            password=password,
            created_at=created_at
        )
        return self.repository.add(user)
    
    def get_user(self,id: int): #-> Optional[UserModel]:
        return self.repository.get_by_id(id)
    
    def update(self,id: int, username: str, email: str, password:str, created_at: Optional[datetime] = None) -> UserModel:
        user = UserModel(
                        id=id,
                        username=username, 
                        email=email,
                        password=password,
                        created_at=created_at
                        )
        return self.repository.update(user)
    
    def list(self):
        return self.repository.get_all_user()
    
    def delete(self,id: int) -> None:
        self.repository.delete(id)