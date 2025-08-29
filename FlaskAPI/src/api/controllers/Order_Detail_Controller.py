from flask import jsonify, Blueprint, request
from datetime import datetime
from services.order_detail_service import Order_Detail_Service
from infrastructure.repositories.Order_Detail_Repositories import OrderDetail_Repository
from infrastructure.databases.mssql import session
from api.schemas.Order_DetailSchema import OrderDetailRequestSchema, OrderDetailResponseSchema

bp = Blueprint('orderdetail', __name__, url_prefix="/orderdetails")

detail_service = Order_Detail_Service(OrderDetail_Repository(session))
request_schema = OrderDetailRequestSchema()
response_schema = OrderDetailResponseSchema()

@bp.route("/all", methods=["GET"])
def get_all():
    detail = detail_service.get_all()
    return response_schema.dump(detail, many=True), 200

# @bp.route("/<int:id>", methods=["GET"])
# def get_detail(id: int):
#     detail = detail_service.get_by_id(id)
#     if not detail:
#         return jsonify({"error": "Details not found"}), 404
#     return response_schema.dump(detail), 200

@bp.route("/order/<int:order_id>", methods=["GET"])
def get_order(order_id:int):
    detail = detail_service.get_all_order(order_id=order_id)
    if not detail:
        return jsonify({"error": "Order not found"}), 404
    return response_schema.dump(detail,many=True), 200

@bp.route("/", methods=["POST"])
def add_detail():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    new_detail = detail_service.create_order_detail(
        order_id=data.get("order_id"),
        watch_id=data.get("watch_id"),
    )

    if not new_detail:
        return jsonify({"error": "Order or Watch not found"}), 404

    return response_schema.dump(new_detail), 201

@bp.route("/<int:id>", methods=["PUT"])
def update_detail(id: int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    detail = detail_service.update(
        order_id=data.get("order_id"),
        watch_id=data.get("watch_id")
    )
    if not detail:
        return jsonify({"error": "Detail not found"}), 404
    return jsonify(response_schema.dump(detail)), 200

@bp.route("/order/<int:id>", methods=["DELETE"])
def delete_order(id: int):
    try:
        detail_service.delete_order(id)
        return jsonify({"message": f"Order {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@bp.route("/order/<int:order_id>/watch/<int:watch_id>",methods=["DELETE"])
def delete_order_watch(order_id:int,watch_id:int):
    try:
        detail_service.delete_order_watch(order_id=order_id,watch_id=watch_id)
        return jsonify({"message": f"Order {order_id}|Watch {watch_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
