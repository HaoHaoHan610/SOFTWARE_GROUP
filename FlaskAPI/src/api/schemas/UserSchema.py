from marshmallow import Schema, fields

class UserRequestSchema(Schema):
    name =fields.Str(required=True)
    email = fields.Str(required=True)

class UserResponseSchema(Schema):
    id = fields.Str(required=True)
    name = fields.Str(required=True)
    email = fields.Str(required=True)

# two kinds of class help fitting for each situation