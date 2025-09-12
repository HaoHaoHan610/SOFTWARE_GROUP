from flask import Flask, jsonify
from flask_cors import CORS
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
from api.controllers.Transaction_Controller import bp as bp_transaction
from flask_restful import Api
def create_app():
    app = Flask(__name__)
    
    try:
        CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)
    except Exception as e:
        print(f"Error enabling CORS: {e}")

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
    app.register_blueprint(bp_transaction)

    @app.route('/')
    def home():
        return '<h1>Vintage Timepiece Evaluation and Trading Platform</h1>'
    return app



if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
