from sqlalchemy import create_engine
# hold the link is connecting your database
# held globally for the lifetime of a single application process. 

from sqlalchemy.orm import sessionmaker
from config import Config
from infrastructure.databases.base import BASE 

DATABASE_URL = Config.DATABASE_URI
# Robust engine with healthy connection pool settings to survive DB idle resets
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,          # auto-reconnect on stale connections
    pool_recycle=1800,           # recycle connections every 30 minutes
    pool_size=10,                # base pool size
    max_overflow=20,             # allow burst connections
)

from sqlalchemy.orm import scoped_session

SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

session = SessionLocal

def init_mssql(app):
    BASE.metadata.create_all(bind=engine)