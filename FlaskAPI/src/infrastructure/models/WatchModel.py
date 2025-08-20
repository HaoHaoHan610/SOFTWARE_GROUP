from infrastructure.databases.base import BASE
from sqlalchemy import Column,ForeignKey,Integer,String,DateTime,Float

class WatchModel(BASE):
    __tablename__ = "Watch"
    __table_args__ = {'extend_existing': True}
    # replace the the first one

    Id = Column(Integer, primary_key=True, nullable=False)
    Name = Column(String(100), nullable=False)
    Brand = Column(String(100), nullable=False)
    Price = Column(Float, nullable=False)
    Created_At = Column(DateTime, nullable=False)
    Appraisal_report = Column(Integer,ForeignKey('Appraisal.Id'))


# self.Watch_id = Watch_id
#         self.brand = brand
#         self.date = date
#         self.condition = condition
#         self.price = price
#         self.appraisal_report = None