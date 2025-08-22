from marshmallow import Schema,fields

class WatchSchemaRequest(Schema):
    name = fields.Str(required=True)
    brand = fields.Str(required=True)
    price = fields.Float(required= True)
    created_at = fields.DateTime(required=False)
    appraisal_report_id = fields.Int(required=False)

class WatchSchemaResponse(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    brand = fields.Str(required=True)
    price = fields.Float(required= True)
    created_at = fields.Raw(required=True)
    appraisal_report_id = fields.Int(required=False, allow_none=True)


# id = Column(Integer, primary_key=True, nullable=False)
#     name = Column(String(100), nullable=False)
#     brand = Column(String(100), nullable=False)
#     price = Column(Float, nullable=False)
#     created_at = Column(DateTime, nullable=False)
#     appraisal_report_id = Column(Integer)