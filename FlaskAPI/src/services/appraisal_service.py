from typing import List, Optional
from infrastructure.models.AppraisalModel import AppraisalModel
from infrastructure.repositories.Appraisal_Repositories import AppraisalRepository
from domain.models.Appraisal import Appraisal
from datetime import datetime


class AppraisalService:
    def __init__(self, repository: AppraisalRepository = None):
        self.repository = repository or AppraisalRepository()

    def create_appraisal(
        self, watch_id: Optional[int]=None, 
        status: Optional[str]=None, 
        appraiser_id: Optional[int]=None,
        es_value: float = None, 
        auth: Optional[bool] = None,
        con_note: str = None
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
        )
        return self.repository.add(new_appraisal)

    def get_by_id(self, id: int) -> Optional[AppraisalModel]:
        return self.repository.get_by_id(id)

    def get_appraisal_each_appraiser(self, appraiser_id: int):
        return self.repository.get_all_each_appraiser(appraiser_id=appraiser_id)

    def get_all_appraisals(self) -> List[AppraisalModel]:
        return self.repository.get_all()

    def update_appraisal(
        self,id:int, 
        watch_id: Optional[int]=None, 
        status: Optional[str]=None, 
        appraiser_id: Optional[int]=None,
        es_value: float = None, 
        auth: Optional[bool] = None,
        con_note: str = None
    ) -> Optional[AppraisalModel]:
        appraisal = Appraisal(
            id=id,
            appraiser_id=appraiser_id,
            watch_id=watch_id,
            es_value=es_value,
            status=status,
            con_note=con_note
        )
        return self.repository.update(appraisal=appraisal)
        

    def update_appraisal_a_w(
        self, 
        appraiser_id:int,
        watch_id: int, 
        status: Optional[str]=None, 
        es_value: float = None, 
        auth: Optional[bool] = None,
        con_note: str = None
    ) -> Optional[AppraisalModel]:

        appraisal = Appraisal(watch_id=watch_id,
                              status=status,
                              appraiser_id=appraiser_id,
                              es_value=es_value,
                              auth=auth,
                              con_note=con_note
                              )
        return self.repository.update_a_w(appraisal)
    
    def delete_appraisal(self, id:int) -> bool:
        return self.repository.delete(id=id)

    def delete_appraisal_a_w(self, appraiser_id: int, watch_id: int) -> bool:
        return self.repository.delete_a_w(appraiser_id=appraiser_id, watch_id=watch_id)

    def get_appraisals_by_watch_id(self, watch_id: int) -> List[AppraisalModel]:
        return self.repository.get_by_watch_id(watch_id)

    def get_appraisals_a_w(self,appraiser_id, watch_id: int) -> List[AppraisalModel]:
        return self.repository.get_by_id_a_w(watch_id=watch_id,appraiser_id=appraiser_id)