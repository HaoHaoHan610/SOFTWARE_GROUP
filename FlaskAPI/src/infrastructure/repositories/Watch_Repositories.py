from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.WatchModel import WatchModel

from typing import List, Optional

class WatchRepository:
    def __init__(self, session: Session = session):
        self.watchs = []
        self.id_counter = 1
        self.session = session
    
    def add(self, watch: WatchModel) -> WatchModel:
        try:
            self.session.add(watch)
            self.session.commit()
            #  auto inditifying id to object designed "ONLY ONE KEY"
            self.session.refresh(watch)
            # refresh apdation depend on database changed
            return watch
        finally:
            self.session.close()
        
        # insert into watch
        # value (id,name,password,email)

    def get_by_id(self, _id: int) -> Optional[WatchModel]:
        return session.query(WatchModel).filter_by(id = _id).first()
    # select * from watch where id = _id

    def get_all_watch(self) -> list[WatchModel]:
        self.watchs = self.session.query(WatchModel).all()
        return self.watchs 

    def update(self,watch: WatchModel) -> Optional[WatchModel]:
        try:
            self.session.merge(watch)
            # merge when same primary key
            self.session.commit()
            self.session.refresh(watch)
            return watch
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
    # find out the way to query to database by the class added from domain

    def delete(self,id:int) -> None:
        try:
            watch = self.session.query(WatchModel).filter_by(id=id).first()
            if not watch:
                raise ValueError("Watch not found")
            
            self.session.delete(watch)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
