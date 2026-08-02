from datetime import datetime

from flask import Blueprint, jsonify
from models import Deal

deal_bp = Blueprint("deals", __name__, url_prefix="/api/deals")


def compute_badge(discount_percent):
    if discount_percent >= 30:
        return "HOT"
    elif discount_percent >= 10:
        return "SALE"
    else:
        return "DEAL"

@deal_bp.route("", methods=["GET"])
def list_deals():
    deals = Deal.query.filter(
        Deal.is_active == True, Deal.ends_at > datetime.utcnow()
    ).all()

    results = []
    for deal in deals:
        product = deal.product
        sale_price = round(product.price * (1 - deal.discount_percent / 100))
        results.append({
            "id": deal.id,
            "product_id": product.id,
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "price": sale_price,
            "oldPrice": product.price,
            "discount": f"-{deal.discount_percent}%",
            "badge": compute_badge(deal.discount_percent),
            "ends_at": deal.ends_at.isoformat(),
            "link": f"/products/{product.id}",
        })

    return jsonify(results)
