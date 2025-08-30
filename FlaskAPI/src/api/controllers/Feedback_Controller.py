from flask import Blueprint, request, jsonify
from infrastructure.databases.mssql import session
from services.feedback_service import FeedbackService
from infrastructure.repositories.Feedback_Repositories import FeedbackRepository
from api.schemas.FeedbackSchema import FeedbackRequestSchema, FeedbackResponseSchema
from datetime import datetime

bp = Blueprint("feedback", __name__, url_prefix="/feedbacks")

feedback_service = FeedbackService(FeedbackRepository(session))

request_schema = FeedbackRequestSchema()
response_schema = FeedbackResponseSchema()


@bp.route("/all", methods=["GET"])
def get_all():
    feedback = feedback_service.get_all()
    return response_schema.dump(feedback, many=True), 200


@bp.route("/<int:feedback_id>", methods=["GET"])
def get_user(feedback_id):
    feedback = feedback_service.get_feedback(id=feedback_id)
    if not feedback:
        return jsonify({"error": "feedback not found"}), 404
    return response_schema.dump(feedback), 200


@bp.route("/", methods=["POST"])
def add_feedbackr():
    data = request.get_json()
    errors = request_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    new_feedback = feedback_service.create_feedback(
        sender_id=data.get("sender_id"),
        receiver_id=data.get("receiver_id"),
        content=data.get("content")
    )
    return response_schema.dump(new_feedback), 201


@bp.route("/<int:id>", methods=["PUT"])
def update_feedback(id: int):
    data = request.get_json()
    errors = request_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    feedback = feedback_service.update(
        id=id,
        sender_id=data.get("sender_id"),
        receiver_id=data.get("receiver_id"),
        content=data.get("content")
    )
    if not feedback:
        return jsonify({"error": "feedback not found"}), 404
    return jsonify(response_schema.dump(feedback)), 200


@bp.route("/<int:id>", methods=["DELETE"])
def delete_feedback(id: int):
    try:
        feedback_service.delete(id)
        return jsonify({"message": f"Feedback {id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@bp.route("/agent", methods=["GET"])
def get_feedback_agent():
    feedback = feedback_service.get_feedback_agent()
    return response_schema.dump(feedback, many=True), 200
