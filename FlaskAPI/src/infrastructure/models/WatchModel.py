from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float

class WatchModel(BASE):
    __tablename__ = "Watch"
    __table_args__ = {'extend_existing': True}
    # replace the the first one

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    brand = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False)
    appraisal_report_id = Column(Integer)

