from flask import Blueprint, jsonify, request
from db.server.models.cart import Cart, CartItem
from db.server.models.product import Product
from db.server.app import db

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    """Get user's cart"""
    cart = Cart.query.filter_by(user_id=user_id).first_or_404()
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/<int:user_id>/add', methods=['POST'])
def add_to_cart(user_id):
    """Add item to cart"""
    data = request.get_json()
    
    if not data.get('product_id') or not data.get('quantity'):
        return jsonify({'error': 'Missing product_id or quantity'}), 400
    
    cart = Cart.query.filter_by(user_id=user_id).first_or_404()
    product = Product.query.get_or_404(data['product_id'])
    
    # Check stock
    if product.stock < data['quantity']:
        return jsonify({'error': 'Insufficient stock'}), 400
    
    # Check if product already in cart
    cart_item = CartItem.query.filter_by(
        cart_id=cart.id,
        product_id=product.id
    ).first()
    
    if cart_item:
        cart_item.quantity += data['quantity']
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=product.id,
            quantity=data['quantity'],
            price=product.price
        )
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/<int:user_id>/remove/<int:item_id>', methods=['DELETE'])
def remove_from_cart(user_id, item_id):
    """Remove item from cart"""
    cart = Cart.query.filter_by(user_id=user_id).first_or_404()
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first_or_404()
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/<int:user_id>/update/<int:item_id>', methods=['PUT'])
def update_cart_item(user_id, item_id):
    """Update cart item quantity"""
    data = request.get_json()
    
    if not data.get('quantity'):
        return jsonify({'error': 'Missing quantity'}), 400
    
    cart = Cart.query.filter_by(user_id=user_id).first_or_404()
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first_or_404()
    
    # Check stock
    if cart_item.product.stock < data['quantity']:
        return jsonify({'error': 'Insufficient stock'}), 400
    
    cart_item.quantity = data['quantity']
    db.session.commit()
    
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/<int:user_id>/clear', methods=['DELETE'])
def clear_cart(user_id):
    """Clear all items from cart"""
    cart = Cart.query.filter_by(user_id=user_id).first_or_404()
    
    CartItem.query.filter_by(cart_id=cart.id).delete()
    db.session.commit()
    
    return jsonify({'message': 'Cart cleared', 'cart': cart.to_dict()}), 200
