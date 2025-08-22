from sqlalchemy.orm import Session
from infrastructure.databases.mssql import session
from infrastructure.models.AppraisalModel import AppraisalModel
from typing import List, Optional
from datetime import datetime

class AppraisalRepository:
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, appraisal: AppraisalModel) -> AppraisalModel:
        """Thêm một appraisal mới"""
        try:
            self.session.add(appraisal)
            self.session.commit()
            self.session.refresh(appraisal)
            return appraisal
        except Exception as e:
            self.session.rollback()
            raise e
        finally:
            self.session.close()

    def get_by_id(self, id: int) -> Optional[AppraisalModel]:
        """Lấy appraisal theo id"""
        return self.session.query(AppraisalModel).filter_by(id=id).first()

    def get_all(self) -> List[AppraisalModel]:
        """Lấy tất cả appraisal"""
        return self.session.query(AppraisalModel).all()

    def update(self, appraisal: AppraisalModel) -> Optional[AppraisalModel]:
        """Cập nhật appraisal"""
        try:
            self.session.merge(appraisal)
            self.session.commit()
            self.session.refresh(appraisal)
            return appraisal
        except Exception:
            self.session.rollback()
            raise ValueError("Appraisal not found or update failed")
        finally:
            self.session.close()

    def delete(self, id: int) -> bool:
        """Xóa appraisal theo id"""
        try:
            appraisal = self.get_by_id(id)
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
        return self.session.query(AppraisalModel).filter_by(Watch_id=watch_id).all()

    def update_note(self, id: int, new_note: str) -> Optional[AppraisalModel]:
        """Cập nhật ghi chú con_note"""
        try:
            appraisal = self.get_by_id(id)
            if not appraisal:
                return None
            appraisal.con_note = new_note
            self.session.commit()
            self.session.refresh(appraisal)
            return appraisal
        except Exception:
            self.session.rollback()
            raise
        finally:
            self.session.close()
