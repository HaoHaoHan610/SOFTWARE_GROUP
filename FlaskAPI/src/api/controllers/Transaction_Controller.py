from flask import Blueprint, request, jsonify
from services.transaction_service import TransactionService, EscrowService
from infrastructure.repositories.Transaction_Repositories import TransactionRepository, EscrowRepository
from api.schemas.TransactionSchema import (
    TransactionRequestSchema, TransactionResponseSchema,
    EscrowRequestSchema, EscrowResponseSchema
)

bp = Blueprint("transaction", __name__, url_prefix="/transactions")

# Khởi tạo service
transaction_service = TransactionService(TransactionRepository())
escrow_service = EscrowService(EscrowRepository())


# -------------------- Transaction --------------------
@bp.route("/create", methods=["POST"])
def create_transaction():
    data = request.get_json()
    schema = TransactionRequestSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400

    transaction = transaction_service.create_transaction(
        buyer_id=data["buyer_id"],
        seller_id=data["seller_id"],
        order_id=data["order_id"],
        amount=data["amount"]
    )

    response_schema = TransactionResponseSchema()
    return jsonify(response_schema.dump(transaction)), 201


@bp.route("/<int:transaction_id>", methods=["GET"])
def get_transaction(transaction_id):
    transaction = transaction_service.get_transaction(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    response_schema = TransactionResponseSchema()
    return jsonify(response_schema.dump(transaction)), 200


@bp.route("/all", methods=["GET"])
def list_transactions():
    transactions = transaction_service.list_transactions()
    response_schema = TransactionResponseSchema(many=True)
    return jsonify(response_schema.dump(transactions)), 200


# -------------------- Escrow --------------------
@bp.route("/escrow/create", methods=["POST"])
def create_escrow():
    data = request.get_json()
    schema = EscrowRequestSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400

    escrow = escrow_service.create_escrow(
        transaction_id=data["transaction_id"],
        amount=data["amount"]
    )

    response_schema = EscrowResponseSchema()
    return jsonify(response_schema.dump(escrow)), 201


@bp.route("/escrow/release/<int:escrow_id>", methods=["PUT"])
def release_escrow(escrow_id):
    escrow = escrow_service.release_escrow(escrow_id)
    if not escrow:
        return jsonify({"error": "Escrow not found"}), 404

    response_schema = EscrowResponseSchema()
    return jsonify(response_schema.dump(escrow)), 200
