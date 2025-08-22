from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func

class AppraisalModel(BASE):
    __tablename__ = 'Appraisal'
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    Watch_id = Column(Integer, ForeignKey('Watch.id'), nullable=False)
    es_value = Column(Float, nullable=True) 
    auth = Column(Boolean, default=False)    
    con_note = Column(String(80), nullable=True)  
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    def __repr__(self):
        return f"<Appraisal(id={self.id}, Watch_id={self.Watch_id}, es_value={self.es_value}, auth={self.auth})>"
