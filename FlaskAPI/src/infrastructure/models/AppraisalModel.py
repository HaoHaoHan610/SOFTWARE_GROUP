from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float,Boolean

class AppraisalModel(BASE):
    __tablename__ = 'Appraisal'
    __table_args__ = {'extend_existing': True}

    id = Column(Integer,primary_key=True)
    Watch_id = Column(Integer,ForeignKey('Watch.id'))
    # Appraiser_id = Column(Integer,ForeignKey("Appraiser.Id"))
    es_value = Column(Float) #Estimate Value
    auth = Column(Boolean)# Authenicity
    con_note = Column(String(80))