from typing import List, Optional
from infrastructure.models.AppraisalModel import AppraisalModel
from FlaskAPI.src.infrastructure.repositories.appraisalRepositories import AppraisalRepository
class AppraisalService:
    def __init__(self, repository: AppraisalRepository = None):
        self.repository = repository or AppraisalRepository()

    def create_appraisal(self, watch_id: int, es_value: float = None,
                         auth: bool = False, con_note: str = None) -> AppraisalModel:
        """Tạo appraisal mới"""
        new_appraisal = AppraisalModel(
            Watch_id=watch_id,
            es_value=es_value,
            auth=auth,
            con_note=con_note
        )
        return self.repository.add(new_appraisal)

    def get_appraisal_by_id(self, id: int) -> Optional[AppraisalModel]:
        """Lấy appraisal theo id"""
        return self.repository.get_by_id(id)

    def get_all_appraisals(self) -> List[AppraisalModel]:
        """Lấy tất cả appraisal"""
        return self.repository.get_all()

    def update_appraisal(self, id: int, es_value: float = None,
                         auth: bool = None, con_note: str = None) -> Optional[AppraisalModel]:
        """Cập nhật appraisal"""
        appraisal = self.repository.get_by_id(id)
        if not appraisal:
            return None
        if es_value is not None:
            appraisal.es_value = es_value
        if auth is not None:
            appraisal.auth = auth
        if con_note is not None:
            appraisal.con_note = con_note
        return self.repository.update(appraisal)

    def delete_appraisal(self, id: int) -> bool:
        """Xóa appraisal"""
        return self.repository.delete(id)

    def get_appraisals_by_watch_id(self, watch_id: int) -> List[AppraisalModel]:
        """Lấy tất cả appraisal của một watch"""
        return self.repository.get_by_watch_id(watch_id)

    def update_note(self, id: int, new_note: str) -> Optional[AppraisalModel]:
        """Cập nhật con_note"""
        return self.repository.update_note(id, new_note)
