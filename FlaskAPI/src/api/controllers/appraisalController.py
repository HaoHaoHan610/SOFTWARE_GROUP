from flask import Blueprint, request, jsonify
from services.appraisal_service import AppraisalService

appraisal_bp = Blueprint("appraisal_bp", __name__)
appraisal_service = AppraisalService()

@appraisal_bp.route("/api/appraisals", methods=["GET"])
def get_all_appraisals():
    appraisals = appraisal_service.get_all_appraisals()
    return jsonify([a.__dict__ for a in appraisals])

@appraisal_bp.route("/api/appraisals", methods=["POST"])
def create_appraisal():
    data = request.get_json()
    try:
        new_appraisal = appraisal_service.create_appraisal(
            watch_id=data["Watch_id"],
            es_value=data.get("es_value"),
            auth=data.get("auth", False),
            con_note=data.get("con_note")
        )
        return jsonify(new_appraisal.__dict__), 201
    except Exception as e:
        return {"error": str(e)}, 400

@appraisal_bp.route("/api/appraisals/<int:id>", methods=["GET"])
def get_appraisal(id: int):
    appraisal = appraisal_service.get_appraisal_by_id(id)
    if not appraisal:
        return {"error": "Appraisal not found"}, 404
    return jsonify(appraisal.__dict__)

@appraisal_bp.route("/api/appraisals/<int:id>", methods=["PUT"])
def update_appraisal(id: int):
    data = request.get_json()
    try:
        updated = appraisal_service.update_appraisal(
            id=id,
            es_value=data.get("es_value"),
            auth=data.get("auth"),
            con_note=data.get("con_note")
        )
        if not updated:
            return {"error": "Appraisal not found"}, 404
        return jsonify(updated.__dict__)
    except Exception as e:
        return {"error": str(e)}, 400

@appraisal_bp.route("/api/appraisals/<int:id>", methods=["DELETE"])
def delete_appraisal(id: int):
    success = appraisal_service.delete_appraisal(id)
    if success:
        return {"message": "Appraisal deleted successfully"}, 200
    return {"error": "Appraisal not found"}, 404

@appraisal_bp.route("/api/appraisals/watch/<int:watch_id>", methods=["GET"])
def get_appraisals_by_watch(watch_id: int):
    appraisals = appraisal_service.get_appraisals_by_watch_id(watch_id)
    return jsonify([a.__dict__ for a in appraisals])

@appraisal_bp.route("/api/appraisals/<int:id>/note", methods=["PUT"])
def update_appraisal_note(id: int):
    data = request.get_json()
    new_note = data.get("con_note")
    if new_note is None:
        return {"error": "con_note is required"}, 400
    updated = appraisal_service.update_note(id, new_note)
    if not updated:
        return {"error": "Appraisal not found"}, 404
    return jsonify(updated.__dict__)
