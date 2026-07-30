from compat.flask import Blueprint

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/api/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):
    from app import DB, app

    return app.jsonify(DB.get_cart(user_id))


@cart_bp.route("/api/cart/<int:user_id>", methods=["POST"])
def add_to_cart_endpoint(user_id):
    from app import DB, app, request

    payload = request.json or {}
    item = DB.add_to_cart(user_id, payload.get("product_id"), payload.get("quantity", 1))
    return app.jsonify(item)


@cart_bp.route("/api/cart/<int:user_id>/<int:cart_id>", methods=["DELETE"])
def remove_from_cart_endpoint(user_id, cart_id):
    from app import DB, app

    item = DB.remove_from_cart(user_id, cart_id)
    return app.jsonify(item)