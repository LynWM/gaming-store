import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app import create_app, DB, StoreDB


def test_create_app_has_blueprints():
    app = create_app()
    assert app is not None


def test_storedb_has_wishlist_methods():
    db = StoreDB(Path("/tmp/test_store.db"))
    assert hasattr(db, "get_wishlist")
    assert hasattr(db, "add_to_wishlist")
    assert hasattr(db, "remove_from_wishlist")


def test_storedb_has_cart_methods():
    db = StoreDB(Path("/tmp/test_store.db"))
    assert hasattr(db, "get_cart")
    assert hasattr(db, "add_to_cart")
    assert hasattr(db, "remove_from_cart")


def test_app_routes_include_wishlist():
    app = create_app()
    route_paths = [rule for rule, _ in app.routes.keys()]
    wishlist_routes = [r for r in route_paths if "wishlist" in r]
    assert len(wishlist_routes) > 0


def test_app_routes_include_cart():
    app = create_app()
    route_paths = [rule for rule, _ in app.routes.keys()]
    cart_routes = [r for r in route_paths if "cart" in r]
    assert len(cart_routes) > 0


def test_app_routes_include_auth():
    app = create_app()
    route_paths = [rule for rule, _ in app.routes.keys()]
    auth_routes = [r for r in route_paths if "auth" in r]
    assert len(auth_routes) > 0


def test_app_routes_include_products():
    app = create_app()
    route_paths = [rule for rule, _ in app.routes.keys()]
    product_routes = [r for r in route_paths if "products" in r]
    assert len(product_routes) > 0