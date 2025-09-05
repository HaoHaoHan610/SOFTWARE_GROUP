# import os

# class Config:
#     #the configuration of BASE
#     DATABASE_URI = os.environ.get('DATABASE_URI') or "mssql+pymssql://sa:Abc112006@127.0.0.1:1433/TEST"

import os

class Config:
    # Cấu hình DATABASE_URI
    # Nếu có biến môi trường thì dùng, nếu không thì dùng default bên dưới
    DATABASE_URI = os.environ.get("DATABASE_URI") or (
        # SQL Authentication
        "mssql+pyodbc://sa:Abc112006@127.0.0.1:1433/TEST?driver=ODBC+Driver+18+for+SQL+Server"
        
        # ⚠️ Nếu bạn muốn dùng Windows Authentication, thay dòng trên bằng:
        # "mssql+pyodbc://@127.0.0.1/TEST?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes"
    )
