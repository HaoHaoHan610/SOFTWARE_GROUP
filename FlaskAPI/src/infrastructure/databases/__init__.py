from infrastructure.databases.mssql import init_mssql
# Take the URI of DATABASE for the interactions with daatabase

def init_db(app):
    init_mssql(app)