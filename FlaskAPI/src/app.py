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
from api.controllers.User_Controller import bp as bp_user
from api.controllers.Watch_Controller import bp as bp_watch
from api.controllers.Appraidal_Controller import bp as bp_appraisal
from api.controllers.Feedback_Controller import bp as bp_feedback
from api.controllers.Order_Controller import bp as bp_order
from api.controllers.Order_Detail_Controller import bp as bp_detail
from flask_restful import Api
def create_app():
    app = Flask(__name__)

    try: 
        init_db(app)
    except Exception as e:
        print(f"Error initializing database: {e}")

    app.register_blueprint(bp_user)
    app.register_blueprint(bp_watch)
    app.register_blueprint(bp_appraisal)
    app.register_blueprint(bp_feedback)
    app.register_blueprint(bp_order)
    app.register_blueprint(bp_detail)

    @app.route('/')
    def home():
        return '<h1>Vintage Timepiece Evaluation and Trading Platform</h1>'
    return app



if __name__ == "__main__":
    app = create_app()
    app.run(debug=True) 
    # api = Api(app)
