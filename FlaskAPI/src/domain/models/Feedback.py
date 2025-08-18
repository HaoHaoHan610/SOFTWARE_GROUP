from datetime import datetime


class Feedback:
    def __init__(self, feedback_id: int, user_id: str, watch_id: int, comment: str = None, rating: int = None):
        self.feedback_id = feedback_id
        self.user_id = user_id          # Reference to User.user_id
        self.watch_id = watch_id        # Reference to Watch.Watch_id
        self.comment = comment
        self.rating = rating            # e.g., 1-5 stars
        self.created_at = datetime.now()
