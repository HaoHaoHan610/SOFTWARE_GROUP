from infrastructure.databases.mssql import session
# communicate with database
from infrastructure.models.TransactionModel import TransactionModel
# communicate directly table in database
from flask import Blueprint,request,jsonify

from services.transaction_service import TransactionService
from infrastructure.repositories.Transaction_Repositories import TransactionRepository

from api.schemas.TransactionSchema import TransactionSchemaRequest,TransactionSchemaResopnse
# Indentify the output data will response and request
from datetime import datetime

bp = Blueprint("transaction", __name__, url_prefix="/transactions")



transaction_service = TransactionService(TransactionRepository(session))
# initializing service used by controller

request_schema = TransactionSchemaRequest()
response_schema = TransactionSchemaRequest()


@bp.route("/all",methods =["GET"])
def get_all():
    user = transaction_service.list()
    return response_schema.dump(user, many = True),400

@bp.route("/<int:transaction_id>",methods =["GET"])
def get_user(transaction_id):
    transaction = transaction_service.get_user(transaction_id)
    if not transaction:
        return jsonify({"error": "transaction not found"}), 404
    return response_schema.dump(transaction),200

@bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()

    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    transaction = transaction_service.create_transaction(
        price = data.get("price"),
        status=data.get("status"),
        order_id=data.get("order_id"),
        created_at=datetime.utcnow()
    )

    return response_schema.dump(transaction), 201

@bp.route("/<int:id>",methods =["PUT"])
def update_transaction(id:int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors),400
    transaction = transaction_service.update(
        id=id,
        price = data.get("price"),
        status=data.get("status"),
        order_id=data.get("order_id"),
        created_at=datetime.utcnow()
    )

    if not user:
        return jsonify({"error": "User not found"}), 404


    return jsonify(response_schema.dump(user)),200

@bp.route("/<int:id>", methods=["DELETE"])
def delete_transaction(id: int):
    try:
        transaction_service.delete(id)
        return jsonify({"message": f"transaction {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
