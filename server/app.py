import os
from pathlib import Path

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db

BASE_DIR = Path(__file__).resolve().parent


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", f"sqlite:///{BASE_DIR / 'store.db'}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate(app, db)
    CORS(app, resources={r"/*": {"origins": "*"}})

    from routes.auth_routes import auth_bp
    from routes.deal_routes import deal_bp
    from routes.order_routes import order_bp
    from routes.product_routes import product_bp
    from routes.user_routes import user_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(deal_bp)

    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"})

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
