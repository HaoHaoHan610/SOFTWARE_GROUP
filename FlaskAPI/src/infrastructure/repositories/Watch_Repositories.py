from sqlalchemy.orm import Session
from domain.models.Watch import Watch
from infrastructure.databases.mssql import session
from infrastructure.models.WatchModel import WatchModel
from typing import Optional,List

class WatchRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, watch: Watch) -> WatchModel:
        watchobj = WatchModel()
        watchobj.name = watch.name
        watchobj.brand = watch.brand
        watchobj.price = watch.price
        watchobj.existing_status=watch.existing_status
        watchobj.seller_id = watch.seller_id
        watchobj.img = watch.img
        # watchobj.appraisal_report_id = watch.appraisal_report_id
        watchobj.created_at = watch.created_at
        try:
            self.session.add(watchobj)
            self.session.commit()
            self.session.refresh(watchobj)
            return watchobj
        finally:
            self.session.close()

    def get_by_id(self, _id: int) -> Optional[WatchModel]:
        return self.session.query(WatchModel).filter_by(id=_id).first()

    def get_all_watch(self) -> List[WatchModel]:
        return self.session.query(WatchModel).all()
    
    def get_by_seller(self,seller_id)->list[WatchModel]:
        return self.session.query(WatchModel).filter_by(seller_id=seller_id).all()

    def update(self, watch: Watch) -> Optional[WatchModel]:
        try:
            watchobj = self.get_by_id(watch.id)
            if not watchobj:
                return None

            if watch.name is not None:
                watchobj.name = watch.name
            if watch.brand is not None:
                watchobj.brand = watch.brand
            if watch.price is not None:
                watchobj.price = watch.price
            if watch.created_at is not None:
                watchobj.created_at = watch.created_at
            if watch.img is not None:
                watchobj.img = watch.img
            if watch.existing_status is not None:
                watchobj.existing_status = watch.existing_status
            # if watch.appraisal_report_id is not None:
            #     watchobj.appraisal_report_id = watch.appraisal_report_id

            self.session.merge(watchobj)
            self.session.commit()
            self.session.refresh(watchobj)
            return watchobj
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()

    def delete(self, id: int) -> None:
        try:
            watch = self.get_by_id(id)
            if not watch:
                raise ValueError("Watch not found")
            self.session.delete(watch)
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()
