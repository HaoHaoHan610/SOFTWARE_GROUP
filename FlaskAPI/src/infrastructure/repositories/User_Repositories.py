from domain.models.User import User
from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.UserModel import UserModel
from typing import Optional

class UserRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, user: User) -> UserModel:
        try:
            userobj = UserModel(
                username=user.username,
                email=user.email,
                password=user.password,
                role=user.role,
                created_at=user.created_at
                # address = user.address
            )
            self.session.add(userobj)
            self.session.commit()
            self.session.refresh(userobj)
            return userobj
        finally:
            self.session.close()

    def get_by_id(self, _id: int) -> Optional[UserModel]:
        return self.session.query(UserModel).filter_by(id=_id).first()

    def get_all_user(self):
        return self.session.query(UserModel).all()

    def update(self, user: User) -> Optional[UserModel]:
        try:
            userobj = self.get_by_id(user.id)
            if not userobj:
                return None
            
            if user.username is not None:
                userobj.username = user.username
            if user.email is not None:
                userobj.email = user.email
            if user.password is not None:
                userobj.password = user.password
            if user.role is not None:    
                userobj.role = user.role
            if user.created_at is not None:
                user.address = user.created_at
            # if user.address is not None:
            #     userobj.address = user.address

            self.session.commit()
            self.session.refresh(userobj)
            return userobj
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()

    def delete(self, id: int) -> None:
        user = self.get_by_id(id)
        if not user:
            raise ValueError("User not found")
        try:
            self.session.delete(user)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
