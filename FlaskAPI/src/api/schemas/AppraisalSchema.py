from marshmallow import Schema, fields


class AppraisalRequestSchema(Schema):
    appraiser_id = fields.Int(required=True)
    watch_id = fields.Int(required=True)
    es_value = fields.Float(required=True)
    auth = fields.Boolean(required=True)
    con_note = fields.Str(required=False)
    status = fields.Str(required=True)


class AppraisalResponseSchema(Schema):
    id = fields.Int(required=True)
    appraiser_id = fields.Int(required=True)
    watch_id = fields.Int(required=True)
    es_value = fields.Float(required=True)
    auth = fields.Boolean(required=True)
    con_note = fields.Str(required=True)
    status = fields.Str(required=True)
    created_at = fields.DateTime(required=False)
    updated_at = fields.DateTime(required=False)
