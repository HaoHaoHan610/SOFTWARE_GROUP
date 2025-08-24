from marshmallow import Schema, fields, post_dump
from datetime import datetime
from Order_DetailSchema import OrderDetailRequestSchema,OrderDetailResponseSchema

class OrderRequestSchema(Schema):
    user_id = fields.Int(required=True)
    items = fields.List(fields.Nested(OrderDetailRequestSchema), required=True)

class OrderResponseSchema(Schema):
    id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    created_at = fields.DateTime(required=True)
    items = fields.List(fields.Nested(OrderDetailResponseSchema))
    quantity = fields.Int(required=True)

