from compat.flask import Blueprint

product_bp = Blueprint("products", __name__)


@product_bp.route("/api/products", methods=["GET"])
def list_products():
    from app import DB, app

    return app.jsonify(DB.list_products())


@product_bp.route("/api/products", methods=["POST"])
def create_product():
    from app import DB, app, request

    product = DB.create_product(request.json or {})
    return app.jsonify(product, 201)


@product_bp.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    from app import DB, app, request

    product = DB.update_product(id, request.json or {})
    return app.jsonify(product)


@product_bp.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    from app import DB, app

    DB.delete_product(id)
    return app.jsonify({"success": True})