from sqlalchemy import create_engine
# hold the link is connecting your database
# held globally for the lifetime of a single application process. 

from sqlalchemy.orm import sessionmaker
from config import Config
from infrastructure.databases.base import BASE 

DATABASE_URL = Config.DATABASE_URI
engine = create_engine(DATABASE_URL,echo=True)
#echo gives the message on terminal for visbiable of quries
# like station

SessionLocal = sessionmaker(autocommit = False, autoflush= False, bind=engine)
session = SessionLocal()
# any session functions for connecting users ,database, application
# enable tracking the users activities and actions
# or trasaction management

def init_mssql(app):
    BASE.metadata.create_all(bind=engine)