from datetime import date


class Feedback:
    def __init__(
        self,
        id: int,
        sender_id: int,
        receiver_id: int,
        content: str = None,
        created_at: date = None,
    ):
        self.id=id,
        self.sender_id=sender_id,
        self.receiver_id=receiver_id      # Reference to Watch.Watch_id
        self.content = content          # e.g., 1-5 stars
        self.created_at = created_at
