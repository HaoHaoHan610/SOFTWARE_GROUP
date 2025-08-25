from flask import Blueprint, request, jsonify
from infrastructure.databases.mssql import session
from services.user_service import UserService
from infrastructure.repositories.User_Repositories import UserRepository
from api.schemas.UserSchema import UserRequestSchema, UserResponseSchema
from datetime import datetime

bp = Blueprint("user", __name__, url_prefix="/users")

User_service = UserService(UserRepository(session))

request_schema = UserRequestSchema()
response_schema = UserResponseSchema()


@bp.route("/all", methods=["GET"])
def get_all():
    user = User_service.list()
    return response_schema.dump(user, many=True), 200


@bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User_service.get_user(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return response_schema.dump(user), 200


@bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    new_user = User_service.create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"],
        role=data["role"],
        address=data.get("address")
    )
    return response_schema.dump(new_user), 201


@bp.route("/<int:id>", methods=["PUT"])
def update_user(id: int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    user = User_service.update(
        id=id,
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password"),
        address=data.get("address"),
        role=data.get("role")
    )
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(response_schema.dump(user)), 200


@bp.route("/<int:id>", methods=["DELETE"])
def delete_user(id: int):
    try:
        User_service.delete(id=id)
        return jsonify({"message": f"User {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
