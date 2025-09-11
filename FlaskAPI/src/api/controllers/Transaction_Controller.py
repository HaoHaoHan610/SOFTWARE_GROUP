from flask import Blueprint, request, jsonify
from services.transaction_service import TransactionService, EscrowService
from services.order_service import OrderService
from infrastructure.repositories.Order_Repositories import OrderRepository
from infrastructure.repositories.Transaction_Repositories import TransactionRepository, EscrowRepository
from api.schemas.TransactionSchema import (
    TransactionRequestSchema, TransactionResponseSchema,
    EscrowRequestSchema, EscrowResponseSchema
)

bp = Blueprint("transaction", __name__, url_prefix="/transactions")

# Khởi tạo service
transaction_service = TransactionService(TransactionRepository())
escrow_service = EscrowService(EscrowRepository())
order_service = OrderService(OrderRepository())


@bp.route("/create", methods=["POST"])
def create_transaction():
    data = request.get_json()
    schema = TransactionRequestSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400

    transaction = transaction_service.create_transaction(
        order_id=data.get("order_id")
    )

    if not transaction:
        return jsonify({"error": "Order not found"}), 404

    response_schema = TransactionResponseSchema()
    return jsonify(response_schema.dump(transaction)), 201


@bp.route("/<int:transaction_id>", methods=["GET"])
def get_transaction(transaction_id):
    transaction = transaction_service.get_transaction(transaction_id)
    if not transaction:
        return jsonify({"error": "Transaction not found"}), 404

    response_schema = TransactionResponseSchema()
    return jsonify(response_schema.dump(transaction)), 200 # Use to confirm corrected form of json body


@bp.route("/all", methods=["GET"])
def list_transactions():
    transactions = transaction_service.list_transactions()
    response_schema = TransactionResponseSchema(many=True)
    return jsonify(response_schema.dump(transactions)), 200


@bp.route("/<int:transaction_id>", methods=["PUT"])
def update_transaction(transaction_id):
    data = request.get_json() or {}
    status = data.get("status")
    amount = data.get("amount")

    updated = transaction_service.update_transaction(transaction_id, status=status, amount=amount)
    if not updated:
        return jsonify({"error": "Transaction not found"}), 404

    response_schema = TransactionResponseSchema()
    return jsonify(response_schema.dump(updated)), 200


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
        amount=data.get("amount"),
        seller_id=data["seller_id"],
    )

    response_schema = EscrowResponseSchema()
    return jsonify(response_schema.dump(escrow)), 201

@bp.route("/escrow/transactions/create", methods=["POST"])
def create_escrowTransaction():
    data = request.get_json() or {}
    transaction_id = data.get("transaction_id")
    if not transaction_id:
        return jsonify({"error": "transaction_id is required"}), 400

    escrow = escrow_service.create_TransactionEscrow(
        transaction_id=transaction_id
    )

    response_schema = EscrowResponseSchema(many=True)
    return jsonify(response_schema.dump(escrow)), 201

@bp.route("/checkout", methods=["POST"])
def checkout():
    data = request.get_json() or {}
    order_id = data.get("order_id")
    if not order_id:
        return jsonify({"error": "order_id is required"}), 400

    order = order_service.get_by_id(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    tx = transaction_service.create_transaction(order_id=order_id)
    if not tx:
        return jsonify({"error": "Cannot create transaction for this order"}), 400

    escrows = escrow_service.create_TransactionEscrow(transaction_id=tx.id)

    tx_schema = TransactionResponseSchema()
    escrow_schema = EscrowResponseSchema(many=True)
    return jsonify({
        "transaction": tx_schema.dump(tx),
        "escrows": escrow_schema.dump(escrows)
    }), 201

@bp.route("/escrow/release/<int:escrow_id>", methods=["PUT"])
def release_escrow(escrow_id):
    escrow = escrow_service.release_escrow(escrow_id)
    if not escrow:
        return jsonify({"error": "Escrow not found"}), 404

    response_schema = EscrowResponseSchema()
    return jsonify(response_schema.dump(escrow)), 200


@bp.route("/escrow/bytransaction/release/<int:transaction_id>", methods=["PUT"])
def release_escrow_by_transaction(transaction_id):
    escrow = escrow_service.release_AllTransactions(transaction_id=transaction_id)
    if not escrow:
        return jsonify({"error": "Escrow not found"}), 404

    response_schema = EscrowResponseSchema(many=True)
    return jsonify(response_schema.dump(escrow)), 200

@bp.route("/escrow/status", methods=["PUT"])
def update_escrow_status(): 
    data = request.get_json()
    schema = EscrowRequestSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify(errors), 400

    escrow = escrow_service.update_transactions_status(
        transaction_id=data.get("transaction_id"),
        status= data.get("status")
    )
    if not escrow:
        return jsonify({"error": "Escrow or Transactions not found"}), 404

    response_schema = EscrowResponseSchema(many=True)
    return jsonify(response_schema.dump(escrow)), 200