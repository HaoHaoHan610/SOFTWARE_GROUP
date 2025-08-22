from flask import Blueprint, request, jsonify
from services.feedback_service import FeedbackService

feedback_bp = Blueprint("feedback_bp", __name__)
feedback_service = FeedbackService()

@feedback_bp.route("/api/feedback", methods=["GET"])
def get_all_feedback():
    feedbacks = feedback_service.get_all_feedback()
    return jsonify(feedbacks)


@feedback_bp.route("/api/feedback", methods=["POST"])
def create_feedback():
    data = request.get_json()
    try:
        new_feedback = feedback_service.create_feedback(data)
        return jsonify(new_feedback), 201
    except Exception as e:
        return {"error": str(e)}, 400


@feedback_bp.route("/api/feedback/<int:id>/<int:watch_id>", methods=["GET"])
def get_feedback(id: int, watch_id: int):
    fb = feedback_service.get_feedback(id, watch_id)
    if not fb:
        return {"error": "Feedback not found"}, 404
    return jsonify(fb)


@feedback_bp.route("/api/feedback/<int:id>/<int:watch_id>", methods=["PUT"])
def update_feedback(id: int, watch_id: int):
    data = request.get_json()
    data["id"] = id
    data["watch_Id"] = watch_id  
    try:
        updated = feedback_service.update_feedback(data)
        if not updated:
            return {"error": "Feedback not found"}, 404
        return jsonify(updated)
    except Exception as e:
        return {"error": str(e)}, 400


@feedback_bp.route("/api/feedback/<int:id>/<int:watch_id>", methods=["DELETE"])
def delete_feedback(id: int, watch_id: int):
    success = feedback_service.delete_feedback(id, watch_id)
    if success:
        return {"message": "Feedback deleted successfully"}, 200
    return {"error": "Feedback not found"}, 404


@feedback_bp.route("/api/feedback/watch/<int:watch_id>", methods=["GET"])
def get_feedback_by_watch(watch_id: int):
    feedbacks = feedback_service.get_feedback_by_watch(watch_id)
    return jsonify(feedbacks)


@feedback_bp.route("/api/feedback/rating/<float:rating>", methods=["GET"])
def get_feedback_by_rating(rating: float):
    feedbacks = feedback_service.get_feedback_by_rating(rating)
    return jsonify(feedbacks)


@feedback_bp.route("/api/feedback/average/<int:watch_id>", methods=["GET"])
def get_average_rating(watch_id: int):
    avg = feedback_service.average_rating(watch_id)
    return {"watch_id": watch_id, "average_rating": avg}
