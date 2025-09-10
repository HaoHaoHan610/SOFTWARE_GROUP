import os

class Config:
    #the configuration of BASE
    DATABASE_URI = os.environ.get('DATABASE_URI') or "mssql+pymssql://sa:Vituonglaiconem123@127.0.0.1:1433/TEST1"