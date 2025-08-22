from infrastructure.databases.mssql import session
from infrastructure.models.WatchModel import WatchModel

from flask import jsonify,Blueprint,request
from datetime import datetime

from services.watch_service import WatchService
from infrastructure.repositories.Watch_Repositories import WatchRepository

from api.schemas.WatchSchema import WatchSchemaRequest, WatchSchemaResponse

bp = Blueprint('watch',__name__,url_prefix="/watchs")


Watch_service = WatchService(WatchRepository(session))

request_schema = WatchSchemaRequest()
response_schema = WatchSchemaResponse()

@bp.route("/all",methods = ["GET"])
def get_all():
    watch = Watch_service.list()
    return response_schema.dump(watch,many=True),200

@bp.route("<int:id>",methods =["GET"])
def get_watch(id:int):
    watch = Watch_service.get_watch(id)
    if not watch:
        return jsonify({"error": "Watch not found"}), 404
    return response_schema.dump(watch),200

@bp.route("/", methods=["POST"])
def add_watch():
    data = request.get_json()

    # validate input từ schema
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    new_watch = Watch_service.create_watch(
        name=data["name"],
        brand=data["brand"],
        price=data["price"],
        appraisal_report_id=data.get("appraisal_report_id")
    )

    return response_schema.dump(new_watch), 201

# @bp.route("/<int:id>", methods=["PUT"])
# def update_watch(id: int):
#     data = request.get_json()

#     # validate input
#     errors = request_schema.validate(data, partial=True)  
#     # partial=True để cho phép update 1 phần field
#     if errors:
#         return jsonify(errors), 400

#     updated_watch = Watch_service.update_watch(
#         id=id,
#         name=data.get("name"),
#         brand=data.get("brand"),
#         price=data.get("price"),
#         appraisal_report_id=data.get("appraisal_report_id")
#     )

#     if not updated_watch:
#         return jsonify({"error": "Watch not found"}), 404

#     return response_schema.dump(updated_watch), 200

@bp.route("/<int:id>",methods =["PUT"])
def update_watch(id:int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors),400
    watch = Watch_service.update(
        id=id,
        name=data.get("name"),
        brand=data.get("brand"),
        price=data.get("price"),
        created_at=datetime.utcnow(),
        appraisal_report_id=data.get("appraisal_report_id",None)
    )

    if not watch:
        return jsonify({"error": "watch not found"}), 404


    return jsonify(response_schema.dump(watch)),200