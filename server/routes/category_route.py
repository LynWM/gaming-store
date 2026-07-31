from flask import Blueprint, jsonify
from models import Category

category_bp = Blueprint("categories", __name__, url_prefix="/api/categories")


@category_bp.route("", methods=["GET"])
def list_categories():
    categories = Category.query.order_by(Category.name).all()
    return jsonify([c.to_dict() for c in categories])