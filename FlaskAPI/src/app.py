from flask import Flask, jsonify
# from api.swagger import spec
# from api.controllers.todo_controller import bp as todo_bp
# from api.middleware import middleware
# from api.responses import success_response
from infrastructure.databases import init_db
from config import Config
from flasgger import Swagger
# from config import SwaggerConfig
from flask_swagger_ui import get_swaggerui_blueprint


def create_app():
    app = Flask(__name__)

    try: 
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    @app.route('/')
    def home():
        return '<h1>Vintage Timepiece Evaluation and Trading Platform</h1>'
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True) 