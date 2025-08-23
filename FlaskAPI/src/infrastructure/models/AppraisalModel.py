from infrastructure.databases.base import BASE
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime


class AppraisalModel(BASE):
    __tablename__ = 'Appraisal'
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, nullable=False)
    appraiser_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    watch_id = Column(Integer, ForeignKey('Watch.id'), nullable=False)
    es_value = Column(Float, nullable=True)
    auth = Column(Boolean, default=False)
    con_note = Column(String(80), nullable=True)
    status = Column(String(80), nullable=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)