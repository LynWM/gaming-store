from flask import Blueprint, jsonify, request
from db.server.models.product import Product
from db.server.app import db

product_bp = Blueprint('products', __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    category = request.args.get('category')
    featured = request.args.get('featured')
    
    query = Product.query.filter_by(is_active=True)
    
    if category:
        query = query.filter_by(category=category)
    
    if featured:
        query = query.filter_by(is_featured=True)
    
    products = query.all()
    return jsonify([p.to_dict() for p in products]), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product"""
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict()), 200

@product_bp.route('/', methods=['POST'])
def create_product():
    """Create a new product (admin only)"""
    data = request.get_json()
    
    if not data.get('name') or not data.get('price'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        category=data.get('category', 'General'),
        stock=data.get('stock', 0),
        image_url=data.get('image_url', '')
    )
    
    db.session.add(product)
    db.session.commit()
    
    return jsonify(product.to_dict()), 201

@product_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update a product (admin only)"""
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.category = data.get('category', product.category)
    product.stock = data.get('stock', product.stock)
    product.image_url = data.get('image_url', product.image_url)
    product.is_featured = data.get('is_featured', product.is_featured)
    
    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product (admin only)"""
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all unique categories"""
    categories = db.session.query(Product.category).distinct().filter(Product.is_active == True).all()
    return jsonify([cat[0] for cat in categories]), 200
