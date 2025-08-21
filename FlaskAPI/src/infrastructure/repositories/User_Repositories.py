from domain.models.User import User
from infrastructure.databases import base

from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session

from typing import List, Optional
# optinal return none or model variable
# list return [] or all entities of table
from dotenv import load_dotenv
# implement on RAM


from infrastructure.models.UserModel import UserModel

class UserRepository:
    def __init__(self, session: Session = session):
        self.users = []
        self.id_counter = 1
        self.session = session
    
    def add(self, user: UserModel) -> UserModel:
        try:
            self.session.add(user)
            self.session.commit()
            #  auto inditifying id to object designed "ONLY ONE KEY"
            self.session.refresh(user)
            # refresh apdation depend on database changed
            return user
        finally:
            self.session.close()
        
        # insert into user
        # value (id,name,password,email)

    def get_by_id(self, _id: int) -> Optional[UserModel]:
        return session.query(UserModel).filter_by(id = _id).first()
    # select * from user where id = _id

    def get_all_user(self) -> list[UserModel]:
        self.users = self.session.query(UserModel).all()
        return self.users 

    def update(self,user: UserModel) -> Optional[UserModel]:
        try:
            self.session.merge(user)
            # merge when same primary key
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise ValueError('User did not find')
        finally:
            self.session.close()
    # find out the way to query to database by the class added from domain

    def delete(self,id:int) -> None:
        new_list = []
        for t in self.users:
            if t.id != id:  # chỉ giữ lại những todo khác id
                new_list.append(t)
        self.users = new_list
