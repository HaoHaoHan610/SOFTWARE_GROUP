from domain.models.Transaction import Transaction
from infrastructure.databases import base

from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session

from typing import List, Optional
# optinal return none or model variable
# list return [] or all entities of table
from dotenv import load_dotenv
# implement on RAM


from infrastructure.models.TransactionModel import TransactionModel

class TransactionRepository:
    def __init__(self, session: Session = session):
        self.transaction = []
        self.id_counter = 1
        self.session = session
    
    def add(self, transaction: TransactionModel) -> TransactionModel:
        try:
            self.session.add(transaction)
            self.session.commit()
            #  auto inditifying id to object designed "ONLY ONE KEY"
            self.session.refresh(transaction)
            # refresh apdation depend on database changed
            return transaction
        finally:
            self.session.close()
        
        # insert into user
        # value (id,name,password,email)

    def get_by_id(self, _id: int) -> Optional[TransactionModel]:
        return session.query(TransactionModel).filter_by(id = _id).first()
    # select * from user where id = _id

    def get_all_user(self) -> list[TransactionModel]:
        self.users = self.session.query(TransactionModel).all()
        return self.users 

    def update(self,transaction: TransactionModel) -> Optional[TransactionModel]:
        try:
            self.session.merge(transaction)
            # merge when same primary key
            self.session.commit()
            self.session.refresh(transaction)
            return transaction
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
    # find out the way to query to database by the class added from domain

    def delete(self,id:int) -> None:
        try:
            transaction = self.session.query(TransactionModel).filter_by(id=id).first()
            if not transaction:
                raise ValueError("User not found")
            
            self.session.delete(transaction)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
