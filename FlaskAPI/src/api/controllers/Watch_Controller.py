# from flask import jsonify, Blueprint, request
# from datetime import datetime
# from services.watch_service import WatchService
# from infrastructure.repositories.Watch_Repositories import WatchRepository
# from infrastructure.databases.mssql import session
# from api.schemas.WatchSchema import WatchSchemaRequest, WatchSchemaResponse

# bp = Blueprint('watch', __name__, url_prefix="/watchs")

# Watch_service = WatchService(WatchRepository(session))
# request_schema = WatchSchemaRequest()
# response_schema = WatchSchemaResponse()

# @bp.route("/all", methods=["GET"])
# def get_all():
#     watch = Watch_service.list()
#     return response_schema.dump(watch, many=True), 200

# @bp.route("/<int:id>", methods=["GET"])
# def get_watch(id: int):
#     watch = Watch_service.get_watch(id)
#     if not watch:
#         return jsonify({"error": "Watch not found"}), 404
#     return response_schema.dump(watch), 200
# @bp.route("/seller/<int:seller_id>", methods=["GET"])
# def get_seller(seller_id:int):
#     watchs = Watch_service.get_seller(seller_id=seller_id)
#     if not watchs:
#         return jsonify({"error": "Seller not found"}), 404
#     return response_schema.dump(watchs,many=True), 200

# @bp.route("/", methods=["POST"])
# def add_watch():
#     data = request.get_json()
#     errors = request_schema.validate(data)
#     if errors:
#         return jsonify(errors), 400
#     new_watch = Watch_service.create_watch(
#         name=data.get("name"),
#         brand=data.get("brand"),
#         price=data.get("price"),
#         seller_id=data.get("seller_id"),
#         img = data.get("img"),
#         # appraisal_report_id=data.get("appraisal_report_id"),
#         existing_status=data.get("existing_status", True) 
#     )
#     return response_schema.dump(new_watch), 201

# @bp.route("/<int:id>", methods=["PUT"])
# def update_watch(id: int):
#     data = request.get_json()
#     errors = request_schema.validate(data, partial=True)
#     if errors:
#         return jsonify(errors), 400
#     watch = Watch_service.update(
#         id=id,
#         name=data.get("name"),
#         brand=data.get("brand"),
#         price=data.get("price"),
#         img = data.get("img"),
#         # appraisal_report_id=data.get("appraisal_report_id", None),
#         existing_status=data.get("existing_status", True)
#     )
#     if not watch:
#         return jsonify({"error": "Watch not found"}), 404
#     return jsonify(response_schema.dump(watch)), 200

# @bp.route("/<int:id>", methods=["DELETE"])
# def delete_watch(id: int):
#     try:
#         Watch_service.delete(id)
#         return jsonify({"message": f"watch {id} deleted successfully"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400







from flask import Blueprint, request, jsonify
from infrastructure.databases.mssql import session
from services.watch_service import WatchService
from infrastructure.repositories.Watch_Repositories import WatchRepository
from api.schemas.WatchSchema import WatchSchemaRequest, WatchSchemaResponse

# sửa url_prefix = "/watches" (chuẩn tiếng Anh)
bp = Blueprint("watch", __name__, url_prefix="/watches")

# khởi tạo service + repository
watch_service = WatchService(WatchRepository(session))
request_schema = WatchSchemaRequest()
response_schema = WatchSchemaResponse()


@bp.route("/all", methods=["GET"])
def get_all():
    watches = watch_service.list()
    return response_schema.dump(watches, many=True), 200


@bp.route("/<int:id>", methods=["GET"])
def get_watch(id: int):
    watch = watch_service.get_watch(id)
    if not watch:
        return jsonify({"error": "Watch not found"}), 404
    return response_schema.dump(watch), 200


@bp.route("/seller/<int:seller_id>", methods=["GET"])
def get_seller(seller_id: int):
    watches = watch_service.get_seller(seller_id=seller_id)
    if not watches:
        return jsonify({"error": "Seller not found"}), 404
    return response_schema.dump(watches, many=True), 200


@bp.route("/", methods=["POST"])
def add_watch():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_watch = watch_service.create_watch(
        name=data.get("name"),
        brand=data.get("brand"),
        price=data.get("price"),
        seller_id=data.get("seller_id"),
        img=data.get("img"),
        existing_status=data.get("existing_status", True),
    )
    return response_schema.dump(new_watch), 201


@bp.route("/<int:id>", methods=["PUT"])
def update_watch(id: int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400

    watch = watch_service.update(
        id=id,
        name=data.get("name"),
        brand=data.get("brand"),
        price=data.get("price"),
        img=data.get("img"),
        existing_status=data.get("existing_status", True),
    )
    if not watch:
        return jsonify({"error": "Watch not found"}), 404

    return response_schema.dump(watch), 200


@bp.route("/<int:id>", methods=["DELETE"])
def delete_watch(id: int):
    try:
        watch_service.delete(id)
        return jsonify({"message": f"Watch {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
