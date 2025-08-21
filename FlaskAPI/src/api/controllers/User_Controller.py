from infrastructure.databases.mssql import session
# communicate with database
from infrastructure.models.UserModel import UserModel
# communicate directly table in database
from flask import Blueprint,request,jsonify

from services.user_service import UserService
from infrastructure.repositories.User_Repositories import UserRepository

from api.schemas.UserSchema import UserRequestSchema,UserResponseSchema
# Indentify the output data will response and request
from datetime import datetime

bp = Blueprint("user", __name__, url_prefix="/users")



User_service = UserService(UserRepository(session))
# initializing service used by controller

request_schema = UserRequestSchema()
response_schema = UserResponseSchema()


@bp.route("/all",methods =["GET"])
def get_all():
    user = User_service.list()
    return response_schema.dump(user, many = True),400

@bp.route("/<int:user_id>",methods =["GET"])
def get_user(user_id):
    user = User_service.get_user(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return response_schema.dump(user),200



@bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()

    # validate input từ schema
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_user = User_service.create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )

    return response_schema.dump(new_user), 201