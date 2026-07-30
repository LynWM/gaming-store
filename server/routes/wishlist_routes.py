from compat.flask import Blueprint

wishlist_bp = Blueprint("wishlist", __name__)


@wishlist_bp.route("/api/wishlist/<int:user_id>", methods=["GET"])
def get_wishlist(user_id):
    from app import DB, app

    return app.jsonify(DB.get_wishlist(user_id))


@wishlist_bp.route("/api/wishlist/<int:user_id>", methods=["POST"])
def add_to_wishlist_endpoint(user_id):
    from app import DB, app, request

    payload = request.json or {}
    item = DB.add_to_wishlist(user_id, payload.get("product_id"))
    return app.jsonify(item)


@wishlist_bp.route("/api/wishlist/<int:user_id>/<int:wishlist_id>", methods=["DELETE"])
def remove_from_wishlist_endpoint(user_id, wishlist_id):
    from app import DB, app

    item = DB.remove_from_wishlist(user_id, wishlist_id)
    return app.jsonify(item)