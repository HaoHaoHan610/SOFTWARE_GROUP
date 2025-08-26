from marshmallow import Schema, fields

# Transaction
class TransactionRequestSchema(Schema):
    buyer_id = fields.Int(required=True)
    seller_id = fields.Int(required=True)
    order_id = fields.Int(required=True)  
    amount = fields.Float(required=False)

class TransactionResponseSchema(Schema):
    id = fields.Int(required=True)
    buyer_id = fields.Int(required=True)
    seller_id = fields.Int(required=True)
    order_id = fields.Int(required=True)
    amount = fields.Float(required=True)
    status = fields.Str(required=True)
    created_at = fields.DateTime(required=True)


# Escrow
class EscrowRequestSchema(Schema):
    transaction_id = fields.Int(required=True)
    amount = fields.Float(required=True)

class EscrowResponseSchema(Schema):
    id = fields.Int(required=True)
    transaction_id = fields.Int(required=True)
    amount = fields.Float(required=True)
    status = fields.Str(required=True)
    created_at = fields.DateTime(required=True)
    released_at = fields.DateTime(required=False)
