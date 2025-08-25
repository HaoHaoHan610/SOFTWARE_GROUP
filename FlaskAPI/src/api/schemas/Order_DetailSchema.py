from marshmallow import Schema, fields

class OrderDetailRequestSchema(Schema):
    order_id = fields.Int(required=True)
    watch_id = fields.Int(required=True)
    # price = fields.Float(required=True)

class OrderDetailResponseSchema(Schema):
    # id = fields.Int(required=True)
    order_id = fields.Int(required=True)
    watch_id = fields.Int(required=True)
    watch_price=fields.Float(required=True)
    # quantity = fields.Int(required=True)
    # price = fields.Method(required=True)#take price from watch table

# def get_price(self,obj):
#     return obj.price