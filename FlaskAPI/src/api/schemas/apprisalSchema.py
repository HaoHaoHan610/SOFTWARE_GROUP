from marshmallow import Schema, fields

class AppraisalRequestSchema(Schema):
    Watch_id = fields.Int(required=True)         
    es_value = fields.Float(required=False)     
    auth = fields.Boolean(required=False)       
    con_note = fields.Str(required=False)       

class AppraisalResponseSchema(Schema):
    id = fields.Int(required=True)
    Watch_id = fields.Int(required=True)
    es_value = fields.Float(required=False)
    auth = fields.Boolean(required=False)
    con_note = fields.Str(required=False)
    created_at = fields.DateTime(required=False)  
    updated_at = fields.DateTime(required=False)  
