from flask import Blueprint, jsonify, request
from models import User, db

user_bp = Blueprint("users", __name__, url_prefix="/api/users")


@user_bp.route("", methods=["GET"])
def list_users():
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([u.to_dict() for u in users])


@user_bp.route("/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get_or_404(id)
    payload = request.get_json() or {}
    user.role = payload.get("role", user.role)
    db.session.commit()
    return jsonify(user.to_dict())


@user_bp.route("/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": True})
