from marshmallow import Schema, fields, post_dump
from datetime import datetime

class OrderRequestSchema(Schema):
    customer_id = fields.Int(required=False)
    status = fields.Str(required=False)
    # items = fields.List(fields.Nested(OrderDetailRequestSchema), required=True)

class OrderResponseSchema(Schema):
    id = fields.Int(required=True)
    customer_id = fields.Int(required=True)
    quantity = fields.Int(required=True)
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)
    status = fields.Str(required=True)
    # items = fields.List(fields.Nested(OrderDetailResponseSchema))
    # quantity = fields.Int(required=True)

