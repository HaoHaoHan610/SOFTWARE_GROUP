from marshmallow import Schema, fields

    # id = Column(Integer,primary_key=True)
    # price = Column(Float,nullable=False)
    # status = Column(String(80),nullable=False)
    # date = Column(DateTime,nullable=False)
    # order_id = Column(Integer,nullable=False)

class TransactionSchemaRequest(Schema):
    price = fields.Float(required=True)
    status = fields.Str(required=True)
    date = fields.Raw(required=True)
    order_int = fields.Int(required=True)

class TransactionSchemaResopnse(Schema):
    id = fields.Int(required=True)
    price = fields.Float(required=True)
    status = fields.Str(required=True)
    date = fields.Raw(required=True)
    order_int = fields.Int(required=True) 
