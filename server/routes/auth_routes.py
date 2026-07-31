from flask import Blueprint, jsonify, request
from models import User, db

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/signup", methods=["POST"])
def signup():
    payload = request.get_json() or {}
    email = payload.get("email")
    password = payload.get("password")

    if not email or not password:
        return jsonify({"success": False, "error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "error": "An account with this email already exists"}), 409

    user = User(
        first_name=payload.get("firstName", ""),
        last_name=payload.get("lastName", ""),
        username=payload.get("username", ""),
        email=email,
        role=payload.get("role", "customer"),
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": True, "user": user.to_dict()})


@auth_bp.route("/login", methods=["POST"])
def login():
    payload = request.get_json() or {}
    email = payload.get("email")
    password = payload.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"success": False, "error": "Invalid credentials"}), 401

    return jsonify({"success": True, "user": user.to_dict()})


# Simple in-memory code store — good enough for a demo, not for production
_reset_codes = {}


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    payload = request.get_json() or {}
    email = payload.get("email")
    if not email:
        return jsonify({"success": False, "error": "Email is required"}), 400
    code = str(abs(hash(email)))[-6:]
    _reset_codes[email] = code
    return jsonify({"success": True, "message": "Reset code sent", "code": code})


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    payload = request.get_json() or {}
    email = payload.get("email")
    code = payload.get("code")
    password = payload.get("password")

    if _reset_codes.get(email) != code:
        return jsonify({"success": False, "error": "Invalid reset code"}), 401

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404

    user.set_password(password)
    db.session.commit()
    return jsonify({"success": True, "message": "Password updated"})