from infrastructure.databases.mssql import session
from infrastructure.models.UserModel import UserModel
from flask_restful import Resource, Api, reqparse, fields, marshal_with


userFields = {
    'id' : fields.Integer,
    'name' : fields.String,
    'email' : fields.String
}

class UserRepository:
    def get_all(self):
        return session.query(UserModel).all()


# Resource lo marshal response
class UserResource(Resource):
    @marshal_with(userFields)
    def get(self):
        repo = UserRepository()
        return repo.get_all()
    



