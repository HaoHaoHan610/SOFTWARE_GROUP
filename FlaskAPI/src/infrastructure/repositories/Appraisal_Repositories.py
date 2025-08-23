from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.AppraisalModel import AppraisalModel
from domain.models.Appraisal import Appraisal
from typing import List, Optional
from datetime import datetime


class AppraisalRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, appraisal: Appraisal) -> AppraisalModel:
        """Thêm appraisal mới"""
        try:
            appraisalobj = AppraisalModel(
                appraiser_id=appraisal.appraiser_id,
                watch_id=appraisal.watch_id,
                auth=appraisal.auth,
                con_note=appraisal.con_note,
                status=appraisal.status,
                es_value=appraisal.es_value,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            self.session.add(appraisalobj)
            self.session.commit()
            self.session.refresh(appraisalobj)
            return appraisalobj
        finally:
            self.session.close()

    def get_by_id(self, id: int):
        return self.session.query(AppraisalModel).filter_by(id=id).first()

    def get_by_id_a_w(self, appraiser_id: int, watch_id: int) -> Optional[AppraisalModel]:
        """Lấy appraisal theo appraiser_id và watch_id"""
        return self.session.query(AppraisalModel).filter_by(
            appraiser_id=appraiser_id, watch_id=watch_id
        ).first()

    def get_all_each_appraiser(self, appraiser_id: int):
        return self.session.query(AppraisalModel).filter_by(appraiser_id=appraiser_id)

    def get_all(self) -> List[AppraisalModel]:
        """Lấy tất cả appraisal"""
        return self.session.query(AppraisalModel).all()

    def update(self, appraisal: Appraisal) -> Optional[AppraisalModel]:
        """Cập nhật appraisal"""
        try:
            appraisalobj = self.get_by_id_a_w(
                appraiser_id=appraisal.appraiser_id,
                watch_id=appraisal.watch_id
            )
            if not appraisalobj:
                return None

            appraisalobj.auth = appraisal.auth
            appraisalobj.con_note = appraisal.con_note
            appraisalobj.es_value = appraisal.es_value
            appraisalobj.status = appraisal.status
            appraisalobj.updated_at = datetime.utcnow()

            self.session.commit()
            self.session.refresh(appraisalobj)
            return appraisalobj
        except Exception:
            self.session.rollback()
            raise ValueError("Appraisal not found or update failed")
        finally:
            self.session.close()


    def delete(self, id:int) -> bool:
        """Xóa appraisal"""
        try:
            appraisal = self.get_by_id(id=id)
            if appraisal:
                self.session.delete(appraisal)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close() 

    def delete_a_w(self, appraiser_id: int, watch_id: int) -> bool:
        """Xóa appraisal theo appraiser_id và watch_id"""
        try:
            appraisal = self.get_by_id_a_w(appraiser_id=appraiser_id, watch_id=watch_id)
            if appraisal:
                self.session.delete(appraisal)
                self.session.commit()
                return True
            return False
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()

    def get_by_watch_id(self, watch_id: int) -> List[AppraisalModel]:
        """Lấy tất cả appraisal của một watch"""
        return self.session.query(AppraisalModel).filter_by(watch_id=watch_id).all()