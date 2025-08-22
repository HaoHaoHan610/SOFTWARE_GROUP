from infrastructure.databases.mssql import session
from flask import Blueprint, request, jsonify

from services.order_service import OrderService
from infrastructure.repositories.orderRepositories import OrderRepository

from api.schemas.orderSchema import OrderRequestSchema, OrderResponseSchema
from datetime import datetime

bp = Blueprint("order", __name__, url_prefix="/orders")

# Service & repository
order_service = OrderService(OrderRepository(session))

# Schemas
request_schema = OrderRequestSchema()
response_schema = OrderResponseSchema()


@bp.route("/all", methods=["GET"])
def get_all_orders():
    orders = order_service.list_orders()
    return response_schema.dump(orders, many=True), 200


@bp.route("/<int:user_id>/<int:watch_id>", methods=["GET"])
def get_order(user_id, watch_id):
    order = order_service.get_order(user_id, watch_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return response_schema.dump(order), 200


@bp.route("/", methods=["POST"])
def add_order():
    data = request.get_json()

    # validate input
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_order = order_service.create_order(
        user_id=data["user_id"],
        watch_id=data["watch_id"],
        quantity=data["quantity"],
        total_price=data.get("total_price", 0.0),
        status=data.get("status", "pending"),
    )
    return response_schema.dump(new_order), 201


@bp.route("/<int:user_id>/<int:watch_id>", methods=["PUT"])
def update_order(user_id, watch_id):
    data = request.get_json()

    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    updated_order = order_service.update_order(
        user_id=user_id,
        watch_id=watch_id,
        quantity=data["quantity"],
        total_price=data.get("total_price", 0.0),
        status=data.get("status", "pending"),
    )

    if not updated_order:
        return jsonify({"error": "Order not found"}), 404

    return response_schema.dump(updated_order), 200


@bp.route("/<int:user_id>/<int:watch_id>", methods=["DELETE"])
def delete_order(user_id, watch_id):
    deleted = order_service.delete_order(user_id, watch_id)
    if not deleted:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({"message": "Order deleted successfully"}), 200


@bp.route("/user/<int:user_id>", methods=["GET"])
def get_orders_by_user(user_id):
    orders = order_service.list_by_user(user_id)
    return response_schema.dump(orders, many=True), 200


@bp.route("/status/<string:status>", methods=["GET"])
def get_orders_by_status(status):
    orders = order_service.list_by_status(status)
    return response_schema.dump(orders, many=True), 200


@bp.route("/<int:user_id>/<int:watch_id>/status", methods=["PATCH"])
def change_order_status(user_id, watch_id):
    data = request.get_json()
    new_status = data.get("status")

    if not new_status:
        return jsonify({"error": "Missing new status"}), 400

    order = order_service.change_status(user_id, watch_id, new_status)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    return response_schema.dump(order), 200


@bp.route("/user/<int:user_id>/total", methods=["GET"])
def calculate_user_total(user_id):
    total = order_service.calculate_user_total(user_id)
    return jsonify({"user_id": user_id, "total_price": total}), 200
