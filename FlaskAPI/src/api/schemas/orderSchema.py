from marshmallow import Schema, fields

class OrderSchema(Schema):
    user_id = fields.Int(required=True)
    watch_id = fields.Int(required=True)
    quantity = fields.Int(required=True)
    total_price = fields.Float(dump_default=0.0)
    status = fields.Str(dump_default="pending")
    created_at = fields.DateTime(required=True)
    updated_at = fields.DateTime(required=True)

# Schema cho 1 đối tượng
order_schema = OrderSchema()

# Schema cho nhiều đối tượng
orders_schema = OrderSchema(many=True)
