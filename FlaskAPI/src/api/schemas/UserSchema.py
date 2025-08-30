from marshmallow import Schema, fields

class UserRequestSchema(Schema):
    username =fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    role = fields.Str(required=True)
    # address = fields.Str(required=True)

class UserResponseSchema(Schema):
    id = fields.Int(required=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    role = fields.Str(required=True)
    created_at = fields.Raw(required=True)
    # address = fields.Str(required=True)


# two types of class help fitting for each situation