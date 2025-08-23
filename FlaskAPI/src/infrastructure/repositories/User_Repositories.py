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
            userobj.username = user.username
            userobj.email = user.email
            userobj.password = user.password
            userobj.role = user.role
            userobj.created_at = user.created_at
            self.session.merge(userobj)
            self.session.commit()
            self.session.refresh(userobj)
            return userobj
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()

    def delete(self, id: int) -> None:
        try:
            user = self.get_by_id(id)
            if not user:
                raise ValueError("User not found")
            self.session.delete(user)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
