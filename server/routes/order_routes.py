from flask import Blueprint, jsonify, request
from models import Order, OrderItem, db

order_bp = Blueprint("orders", __name__, url_prefix="/api/orders")


@order_bp.route("", methods=["GET"])
def list_orders():
    orders = Order.query.order_by(Order.id.desc()).all()
    return jsonify([o.to_dict() for o in orders])


@order_bp.route("", methods=["POST"])
def create_order():
    payload = request.get_json() or {}
    order = Order(
        user_id=payload["user_id"],
        total=payload.get("total", 0),
        status="pending",
    )
    db.session.add(order)
    db.session.flush()  # get order.id before commit

    for item in payload.get("items", []):
        db.session.add(OrderItem(
            order_id=order.id,
            product_id=item["product_id"],
            quantity=item.get("quantity", 1),
            price_at_purchase=item["price"],
        ))

    db.session.commit()
    return jsonify(order.to_dict()), 201


@order_bp.route("/<int:id>", methods=["PUT"])
def update_order(id):
    order = Order.query.get_or_404(id)
    payload = request.get_json() or {}
    order.status = payload.get("status", order.status)
    db.session.commit()
    return jsonify(order.to_dict())
