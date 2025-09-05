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


# with engine.connect() as conn:
#     result = conn.execute(text("SELECT * FROM users"))
#     for row in result:
#         print(row)


SessionLocal = sessionmaker(autocommit = False, autoflush= False, bind=engine)
session = SessionLocal()
# any session functions for connecting users ,database, application
# enable tracking the users activities and actions
# or trasaction management
# 

def init_mssql(app):
    BASE.metadata.create_all(bind=engine)








# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
# from config import Config

# # Base dùng cho ORM models
# BASE = declarative_base()

# # ⚠️ Bạn cần đảm bảo Config.DATABASE_URI đúng format:
# # SQL Authentication
# # Config.DATABASE_URI = "mssql+pyodbc://sa:your_password@localhost:1433/YourDatabase?driver=ODBC+Driver+18+for+SQL+Server"
# #
# # Windows Authentication
# # Config.DATABASE_URI = "mssql+pyodbc://@localhost/YourDatabase?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes"

# DATABASE_URL = Config.DATABASE_URI

# # Tạo engine
# engine = create_engine(DATABASE_URL, echo=True, future=True)

# # Session
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Hàm khởi tạo DB (tạo bảng nếu chưa có)
# def init_mssql(app):
#     BASE.metadata.create_all(bind=engine)




# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from config import Config
# from infrastructure.databases.base import BASE

# # Lấy URL kết nối từ config.py
# DATABASE_URL = Config.DATABASE_URI

# # Tạo engine kết nối tới SQL Server
# engine = create_engine(DATABASE_URL, echo=True)

# # Tạo SessionLocal (factory tạo session mới)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Đây là session mà bạn có thể import trực tiếp ở controller
# session = SessionLocal()

# # Hàm khởi tạo database (tạo bảng từ BASE.metadata)
# def init_mssql(app):
#     BASE.metadata.create_all(bind=engine)
