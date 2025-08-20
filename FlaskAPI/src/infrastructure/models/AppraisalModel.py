from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float,Boolean

class AppraisalModel(BASE):
    __tablename__ = 'Appraisal'
    __table_args__ = {'extend_existing': True}

    Id = Column(Integer,primary_key=True)
    Watch_id = Column(Integer,ForeignKey('Watch.Id'))
    # Appraiser_id = Column(Integer,ForeignKey("Appraiser.Id"))
    Es_value = Column(Float) #Estimate Value
    Auth = Column(Boolean)# Authenicity
    Con_Note = Column(String(80))