from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize extensions
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Database configuration
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "gaming_store.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
   
    db.init_app(app)
    CORS(app)
    
    # Import models
    from db.server.models.user import User
    from db.server.models.product import Product
    from db.server.models.cart import Cart
    from db.server.models.order import Order, OrderItem
    
    # Create tables within app context
    with app.app_context():
        db.create_all()
        print("✓ Database tables created successfully!")
    
    # Register blueprints
    from db.server.routes.auth_routes import auth_bp
    from db.server.routes.product_routes import product_bp
    from db.server.routes.cart_routes import cart_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(product_bp, url_prefix='/api/products')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
