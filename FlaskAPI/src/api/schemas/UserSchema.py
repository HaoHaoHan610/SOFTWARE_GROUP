from marshmallow import Schema, fields

class UserRequestSchema(Schema):
    name =fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)

class UserResponseSchema(Schema):
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    created_at = fields.Raw(required=True)


# two types of class help fitting for each situation