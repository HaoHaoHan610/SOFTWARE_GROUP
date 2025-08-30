from marshmallow import Schema, fields


class FeedbackRequestSchema(Schema):
    sender_id = fields.Int(required=True)
    receiver_id = fields.Int(required=True)
    content = fields.Str(required=True)


class FeedbackResponseSchema(Schema):
    id=fields.Int(required=True)
    sender_id = fields.Int(required=True)
    receiver_id = fields.Int(required=True)
    content = fields.Str(required=True)
    created_at = fields.Raw(required=True)
