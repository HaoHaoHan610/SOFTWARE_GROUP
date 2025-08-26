from flask import jsonify, Blueprint, request
from datetime import datetime
from services.order_service import OrderService
from infrastructure.repositories.Order_Repositories import OrderRepository
from infrastructure.databases.mssql import session
from api.schemas.OrderSchema import OrderRequestSchema, OrderResponseSchema

bp = Blueprint('order', __name__, url_prefix="/orders")

order_service = OrderService(OrderRepository(session))
request_schema = OrderRequestSchema()
response_schema = OrderResponseSchema()

@bp.route("/all", methods=["GET"])
def get_all():
    order = order_service.get_all()
    return response_schema.dump(order, many=True), 200

@bp.route("/<int:id>", methods=["GET"])
def get_detail(id: int):
    order = order_service.get_by_id(id)
    if not order:
        return jsonify({"error": "Details not found"}), 404
    return response_schema.dump(order), 200

@bp.route("/customer/<int:customer_id>",methods=["GET"])
def get_order(customer_id:int):
    orders = order_service.get_customer(customer_id=customer_id)
    if not orders:
        return jsonify({"error": "Customer not found"}), 404
    return response_schema.dump(orders,many=True), 200

@bp.route("/", methods=["POST"])
def add_order():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    new_order = order_service.create_order(
        customer_id=data.get("customer_id")
    )
    return response_schema.dump(new_order), 201

@bp.route("/<int:id>/status", methods=["PUT"])
def update_status(id):
    data = request.get_json() or {}
    status = data.get("status")
    if not status:
        return jsonify({"error": "Status is required"}), 400

    order = order_service.status_change(id=id, status=status)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return response_schema.dump(order), 200

@bp.route("/", methods=["PUT"])
def update_detail(id: int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    detail = order_service.update(
        id = id,
        customer_id=data.get("customer_id"),
        status=data.get("status"),
        address=data.get("address")
    )
    if not detail:
        return jsonify({"error": "Detail not found"}), 404
    return jsonify(response_schema.dump(detail)), 200

@bp.route("/<int:id>", methods=["DELETE"])
def delete_order(id: int):
    try:
        order_service.delete(id)
        return jsonify({"message": f"Order {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# @bp.route("/order/<int:order_id>/watch/<watch_id:int>",methods=["DELETE"])
# def delete_order_watch(order_id:int,watch_id:int):
#     try:
#         detail_service.delete_order_watch(order_id=order_id,watch_id=watch_id)
#         return jsonify({"message": f"Order {order_id}|Watch {watch_id} deleted successfully"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400
