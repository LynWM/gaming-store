from flask import Blueprint

# Create blueprints (we'll populate these in their respective files)
auth_bp = Blueprint('auth', __name__)
product_bp = Blueprint('products', __name__)
cart_bp = Blueprint('cart', __name__)

__all__ = ['auth_bp', 'product_bp', 'cart_bp']
