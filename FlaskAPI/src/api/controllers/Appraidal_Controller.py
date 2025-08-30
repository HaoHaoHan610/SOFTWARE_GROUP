from flask import Blueprint, request, jsonify
from infrastructure.databases.mssql import session
from infrastructure.models.AppraisalModel import AppraisalModel
from services.appraisal_service import AppraisalService
from infrastructure.repositories.Appraisal_Repositories import AppraisalRepository
from api.schemas.AppraisalSchema import AppraisalRequestSchema,AppraisalResponseSchema

bp = Blueprint("appraisal", __name__, url_prefix="/appraisals")

# Services & Schemas
appraisal_service = AppraisalService(AppraisalRepository(session))
request_schema = AppraisalRequestSchema()
response_schema = AppraisalResponseSchema()

# ----------------------
# GET all appraisals
# ----------------------
@bp.route("/all", methods=["GET"])
def get_all():
    appraisals = appraisal_service.get_all_appraisals()
    return jsonify(response_schema.dump(appraisals, many=True)), 200

# ----------------------
# CREATE appraisal
# ----------------------
@bp.route("/", methods=["POST"])
def create_appraisal():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    try:
        new_appraisal = appraisal_service.create_appraisal(
            appraiser_id=data.get("appraiser_id"),
            watch_id=data.get("watch_id"),
            es_value=data.get("es_value"),
            status=data.get("status"),
            auth=data.get("auth"),
            con_note=data.get("con_note")
        )
        return jsonify(response_schema.dump(new_appraisal)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ----------------------
# GET appraisal by id
# ----------------------
@bp.route("/<int:id>", methods=["GET"])
def get_appraisal(id: int):
    appraisal = appraisal_service.get_by_id(id=id)
    if not appraisal:
        return jsonify({"error": "Appraisal not found"}), 404
    return jsonify(response_schema.dump(appraisal)), 200

# ----------------------
# GET all appraisals by appraiser
# ----------------------

# ----------------------
# UPDATE appraisal by appraiser + watch
# ----------------------
@bp.route("/<int:id>", methods=["PUT"])
def update_appraisal(id:int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)  # cho phép update 1 phần
    if errors:
        return jsonify(errors), 400

    try:
        updated = appraisal_service.update_appraisal(
            id=id,
            status=data.get("status"),
            con_note=data.get("con_note"),
            es_value=data.get("es_value"),
            auth=data.get("auth")
        )
        if not updated:
            return jsonify({"error": "Appraisal not found"}), 404
        return jsonify(response_schema.dump(updated)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route("/appraiser/<int:appraiser_id>/watch/<int:watch_id>", methods=["PUT"])
def update_a_w(appraiser_id:int,watch_id:int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)  # cho phép update 1 phần
    if errors:
        return jsonify(errors), 400

    try:
        updated = appraisal_service.update_appraisal_a_w(
            watch_id=watch_id,
            appraiser_id=appraiser_id,
            status=data.get("status"),
            con_note=data.get("con_note"),
            es_value=data.get("es_value"),
            auth=data.get("auth")
        )
        if not updated:
            return jsonify({"error": "Appraisal not found"}), 404
        return jsonify(response_schema.dump(updated)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ----------------------
# DELETE appraisal by appraiser + watch
# ----------------------

@bp.route("/<int:id>", methods=["DELETE"])
def delete_appraisal(id:int):
    success = appraisal_service.delete_appraisal(id=id)
    if success:
        return jsonify({"message": "Appraisal deleted successfully"}), 200
    return jsonify({"error": "Appraisal not found"}), 404


@bp.route("/appraiser/<int:appraiser_id>/watch/<int:watch_id>", methods=["DELETE"])
def delete_appraisal_a_w(appraiser_id: int, watch_id: int):
    success = appraisal_service.delete_appraisal_a_w(appraiser_id=appraiser_id, watch_id=watch_id)
    if success:
        return jsonify({"message": "Appraisal deleted successfully"}), 200
    return jsonify({"error": "Appraisal not found"}), 404

# ----------------------
# GET all appraisals by watch
# ----------------------
@bp.route("/watch/<int:watch_id>", methods=["GET"])
def get_appraisals_by_watch(watch_id: int):
    appraisals = appraisal_service.get_appraisals_by_watch_id(watch_id)
    return jsonify(response_schema.dump(appraisals, many=True)), 200

@bp.route("/appraiser/<int:appraiser_id>", methods=["GET"])
def get_appraisals_by_appraiser(appraiser_id: int):
    appraisals = appraisal_service.get_appraisal_each_appraiser(appraiser_id=appraiser_id)
    return jsonify(response_schema.dump(appraisals, many=True)), 200

@bp.route("/appraiser/<int:appraiser_id>/watch/<int:watch_id>", methods=["GET"])
def get_appraisals_by_a_w(appraiser_id: int,watch_id:int):
    appraisals = appraisal_service.get_appraisals_a_w(appraiser_id=appraiser_id,watch_id=watch_id)
    return jsonify(response_schema.dump(appraisals)), 200
