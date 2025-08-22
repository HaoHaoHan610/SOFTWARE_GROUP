from marshmallow import Schema,fields

class FeedbackRequestSchema(Schema):
    watch_Id=fields.Int(required=True)
    comment=fields.Str(required=False)
    rating=fields.Float(required=False)

class FeedbackResponseSchema(Schema):
    id=fields.Int(required=True)
    watch_Id=fields.Int(required=True)
    comment=fields.Str(required=False)
    rating=fields.Float(required=False)
    created_At=fields.Raw(required=True)
