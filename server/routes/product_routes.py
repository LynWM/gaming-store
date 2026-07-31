from flask import Blueprint, jsonify, request
from sqlalchemy import or_

from models import Category, Product, db

product_bp = Blueprint("products", __name__, url_prefix="/api/products")


@product_bp.route("", methods=["GET"])
def list_products():
    query = Product.query
    category_slug = request.args.get("category")
    if category_slug:
        category = Category.query.filter_by(slug=category_slug).first()
        if category:
            query = query.filter_by(category_id=category.id)
        else:
            return jsonify([])  # unknown category slug — no matches

    search_term = request.args.get("q", "").strip()
    if search_term:
        like = f"%{search_term}%"
        query = query.filter(
            or_(Product.name.ilike(like), Product.description.ilike(like))
        )

    products = query.order_by(Product.id.desc()).all()
    return jsonify([p.to_dict() for p in products])


@product_bp.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())


@product_bp.route("", methods=["POST"])
def create_product():
    payload = request.get_json() or {}
    product = Product(
        name=payload["name"],
        description=payload.get("description", ""),
        price=payload["price"],
        stock=payload.get("stock", 0),
        image=payload.get("image"),
        category_id=payload["category_id"],
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201


@product_bp.route("/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get_or_404(id)
    payload = request.get_json() or {}
    for field in ["name", "description", "price", "stock", "image", "category_id"]:
        if field in payload:
            setattr(product, field, payload[field])
    db.session.commit()
    return jsonify(product.to_dict())


@product_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"success": True})