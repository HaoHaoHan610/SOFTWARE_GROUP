from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with

app = Flask(__name__)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"


@app.route('/')
def home():
    return '<h1>Flask REST API</h1>'

if __name__ == "__main__":
    app.run(debug=True)