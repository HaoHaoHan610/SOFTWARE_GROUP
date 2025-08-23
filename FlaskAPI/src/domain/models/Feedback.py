from datetime import date


class Feedback:
    def __init__(
        self,
        id: int,
        sender_id: int,
        reciever_id: int,
        comment: str = None,
        created_at: date = None,
    ):
        self.id=id,
        self.sender_id=sender_id,
        self.reciever_id=reciever_id      # Reference to Watch.Watch_id
        self.comment = comment          # e.g., 1-5 stars
        self.created_at = created_at
