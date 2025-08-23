from typing import List, Optional
from infrastructure.models.AppraisalModel import AppraisalModel
from infrastructure.repositories.Appraisal_Repositories import AppraisalRepository
from domain.models.Appraisal import Appraisal
from datetime import datetime


class AppraisalService:
    def __init__(self, repository: AppraisalRepository = None):
        self.repository = repository or AppraisalRepository()

    def create_appraisal(
        self, watch_id: int, status: str, appraiser_id: int,
        es_value: float = None, auth: bool = False,
        con_note: str = None, created_at: Optional[datetime] = None,
        update_at: Optional[datetime] = None
    ) -> AppraisalModel:
        """Tạo appraisal mới"""
        new_appraisal = Appraisal(
            id=None,
            appraiser_id=appraiser_id,
            watch_id=watch_id,
            es_value=es_value,
            auth=auth,
            status=status,
            con_note=con_note,
            updated_at=update_at or datetime.utcnow(),
            created_at=created_at or datetime.utcnow()
        )
        return self.repository.add(new_appraisal)

    def get_by_id(self, id: int) -> Optional[AppraisalModel]:
        return self.repository.get_by_id(id)

    def get_appraisal_each_appraiser(self, appraiser_id: int):
        return self.repository.get_all_each_appraiser(appraiser_id=appraiser_id)

    def get_all_appraisals(self) -> List[AppraisalModel]:
        return self.repository.get_all()

    def update_appraisal(
        self,id:int, status: str = None,
        es_value: float = None, auth: bool = None, con_note: str = None
    ) -> Optional[AppraisalModel]:
        appraisal = self.repository.get_by_id(id=id)
        if not appraisal:
            return None

        if es_value is not None:
            appraisal.es_value = es_value
        if auth is not None:
            appraisal.auth = auth
        if con_note is not None:
            appraisal.con_note = con_note
        if status is not None:
            appraisal.status = status

        appraisal.updated_at = datetime.utcnow()
        return self.repository.update(appraisal)

    def update_appraisal_a_w(
        self, appraiser_id: int, watch_id: int, status: str = None,
        es_value: float = None, auth: bool = None, con_note: str = None
    ) -> Optional[AppraisalModel]:
        appraisal = self.repository.get_by_id_a_w(appraiser_id=appraiser_id, watch_id=watch_id)
        if not appraisal:
            return None

        if es_value is not None:
            appraisal.es_value = es_value
        if auth is not None:
            appraisal.auth = auth
        if con_note is not None:
            appraisal.con_note = con_note
        if status is not None:
            appraisal.status = status

        appraisal.updated_at = datetime.utcnow()
        return self.repository.update(appraisal)
    
    def delete_appraisal(self, id:int) -> bool:
        return self.repository.delete(id=id)

    def delete_appraisal_a_w(self, appraiser_id: int, watch_id: int) -> bool:
        return self.repository.delete_a_w(appraiser_id=appraiser_id, watch_id=watch_id)

    def get_appraisals_by_watch_id(self, watch_id: int) -> List[AppraisalModel]:
        return self.repository.get_by_watch_id(watch_id)
