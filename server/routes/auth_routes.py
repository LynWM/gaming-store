from compat.flask import Blueprint

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/auth/signup", methods=["POST"])
def signup():
    from app import DB, app, request

    payload = request.json or {}
    if not payload.get("email") or not payload.get("password"):
        return app.jsonify({"success": False, "error": "Email and password are required"}, 400)
    if DB.get_user_by_email(payload["email"]):
        return app.jsonify({"success": False, "error": "An account with this email already exists"}, 409)
    user = DB.create_user(payload)
    code = str(abs(hash(payload["email"])))[-6:]
    DB.save_verification_code(payload["email"], code)
    return app.jsonify({"success": True, "user": user, "code": code})


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    from app import DB, app, request

    payload = request.json or {}
    user = DB.login(payload.get("email"), payload.get("password"))
    if not user:
        return app.jsonify({"success": False, "error": "Invalid credentials"}, 401)
    return app.jsonify({"success": True, "user": user})


@auth_bp.route("/api/auth/verify", methods=["POST"])
def verify_code():
    from app import DB, app, request

    payload = request.json or {}
    email = payload.get("email")
    code = payload.get("code")
    if not email or not code:
        return app.jsonify({"success": False, "error": "Email and code are required"}, 400)
    return app.jsonify({"success": DB.verify_code(email, code)})


@auth_bp.route("/api/auth/forgot-password", methods=["POST"])
def forgot_password():
    from app import DB, app, request

    payload = request.json or {}
    email = payload.get("email")
    if not email:
        return app.jsonify({"success": False, "error": "Email is required"}, 400)
    code = str(abs(hash(email)))[-6:]
    DB.save_reset_code(email, code)
    DB.save_verification_code(email, code)
    return app.jsonify({"success": True, "message": "Reset code sent", "code": code})


@auth_bp.route("/api/auth/reset-password", methods=["POST"])
def reset_password():
    from app import DB, app, request

    payload = request.json or {}
    email = payload.get("email")
    code = payload.get("code")
    password = payload.get("password")
    if not email or not code or not password:
        return app.jsonify({"success": False, "error": "Email, code, and password are required"}, 400)
    ok = DB.reset_password(email, code, password)
    if not ok:
        return app.jsonify({"success": False, "error": "Invalid reset code"}, 401)
    return app.jsonify({"success": True, "message": "Password updated"})