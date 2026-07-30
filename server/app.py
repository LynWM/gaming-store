import os
import sqlite3
import threading
from pathlib import Path
from typing import Any, Dict, List

from compat.flask import Flask, request

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "store.db"


class StoreDB:
    def __init__(self, path: Path):
        self.path = path
        self._init_db()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._connect() as conn:
            conn.executescript(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    username TEXT NOT NULL UNIQUE,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    role TEXT NOT NULL DEFAULT 'customer'
                );

                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT NOT NULL,
                    price REAL NOT NULL,
                    category TEXT NOT NULL,
                    stock INTEGER NOT NULL DEFAULT 0,
                    image TEXT
                );

                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    total REAL NOT NULL,
                    status TEXT NOT NULL DEFAULT 'pending'
                );

                CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    price REAL NOT NULL
                );

                CREATE TABLE IF NOT EXISTS cart_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1
                );

                CREATE TABLE IF NOT EXISTS wishlist_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, product_id)
                );

                CREATE TABLE IF NOT EXISTS password_resets (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL,
                    code TEXT NOT NULL,
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS verification_codes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL,
                    code TEXT NOT NULL,
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )

            conn.commit()

    def create_user(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        with self._connect() as conn:
            cursor = conn.execute(
                "INSERT INTO users (first_name, last_name, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    payload["firstName"],
                    payload["lastName"],
                    payload["username"],
                    payload["email"],
                    payload["password"],
                    payload.get("role", "customer"),
                ),
            )
            conn.commit()
            user_id = cursor.lastrowid
            row = conn.execute(
                "SELECT id, first_name, last_name, username, email, role FROM users WHERE id = ?",
                (user_id,),
            ).fetchone()
            return dict(row) if row else {}

    def get_user_by_email(self, email: str):
        with self._connect() as conn:
            return conn.execute(
                "SELECT id, first_name, last_name, username, email, password, role FROM users WHERE email = ?",
                (email,),
            ).fetchone()

    def login(self, email: str, password: str):
        row = self.get_user_by_email(email)
        if row and row["password"] == password:
            return dict(row)
        return None

    def list_users(self):
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT id, first_name, last_name, username, email, role FROM users ORDER BY id DESC"
            ).fetchall()
            return [dict(row) for row in rows]

    def update_user(self, user_id: int, payload: Dict[str, Any]):
        with self._connect() as conn:
            conn.execute(
                "UPDATE users SET role = ? WHERE id = ?",
                (payload.get("role", "customer"), user_id),
            )
            conn.commit()
            return self.list_users()

    def delete_user(self, user_id: int):
        with self._connect() as conn:
            conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
            conn.commit()
            return self.list_users()

    def create_product(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        with self._connect() as conn:
            cursor = conn.execute(
                "INSERT INTO products (name, description, price, category, stock, image) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    payload["name"],
                    payload["description"],
                    payload["price"],
                    payload["category"],
                    payload.get("stock", 0),
                    payload.get("image"),
                ),
            )
            conn.commit()
            product_id = cursor.lastrowid
            row = conn.execute(
                "SELECT id, name, description, price, category, stock, image FROM products WHERE id = ?",
                (product_id,),
            ).fetchone()
            return dict(row) if row else {}

    def list_products(self):
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT id, name, description, price, category, stock, image FROM products ORDER BY id DESC"
            ).fetchall()
            return [dict(row) for row in rows]

    def get_product(self, product_id: int):
        with self._connect() as conn:
            row = conn.execute(
                "SELECT id, name, description, price, category, stock, image FROM products WHERE id = ?",
                (product_id,),
            ).fetchone()
            return dict(row) if row else None

    def update_product(self, product_id: int, payload: Dict[str, Any]):
        with self._connect() as conn:
            conn.execute(
                "UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock = ?, image = ? WHERE id = ?",
                (
                    payload["name"],
                    payload["description"],
                    payload["price"],
                    payload["category"],
                    payload.get("stock", 0),
                    payload.get("image"),
                    product_id,
                ),
            )
            conn.commit()
            return self.get_product(product_id)

    def delete_product(self, product_id: int):
        with self._connect() as conn:
            conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
            conn.commit()
            return True

    def get_cart(self, user_id: int):
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT cart_items.id as cart_id, cart_items.product_id, cart_items.quantity, products.name, products.price, products.image FROM cart_items JOIN products ON products.id = cart_items.product_id WHERE cart_items.user_id = ?",
                (user_id,),
            ).fetchall()
            return [dict(row) for row in rows]

    def add_to_cart(self, user_id: int, product_id: int, quantity: int = 1):
        with self._connect() as conn:
            existing = conn.execute(
                "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
                (user_id, product_id),
            ).fetchone()
            if existing:
                conn.execute(
                    "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
                    (quantity, existing["id"]),
                )
            else:
                conn.execute(
                    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
                    (user_id, product_id, quantity),
                )
            conn.commit()
            return self.get_cart(user_id)

    def remove_from_cart(self, user_id: int, cart_id: int):
        with self._connect() as conn:
            conn.execute("DELETE FROM cart_items WHERE user_id = ? AND id = ?", (user_id, cart_id))
            conn.commit()
            return self.get_cart(user_id)

    def get_wishlist(self, user_id: int):
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT wishlist_items.id as wishlist_id, wishlist_items.product_id, wishlist_items.created_at, products.name, products.price, products.image, products.category FROM wishlist_items JOIN products ON products.id = wishlist_items.product_id WHERE wishlist_items.user_id = ?",
                (user_id,),
            ).fetchall()
            return [dict(row) for row in rows]

    def add_to_wishlist(self, user_id: int, product_id: int):
        with self._connect() as conn:
            existing = conn.execute(
                "SELECT id FROM wishlist_items WHERE user_id = ? AND product_id = ?",
                (user_id, product_id),
            ).fetchone()
            if existing:
                return self.get_wishlist(user_id)
            conn.execute(
                "INSERT INTO wishlist_items (user_id, product_id) VALUES (?, ?)",
                (user_id, product_id),
            )
            conn.commit()
            return self.get_wishlist(user_id)

    def remove_from_wishlist(self, user_id: int, wishlist_id: int):
        with self._connect() as conn:
            conn.execute("DELETE FROM wishlist_items WHERE user_id = ? AND id = ?", (user_id, wishlist_id))
            conn.commit()
            return self.get_wishlist(user_id)

    def create_order(self, user_id: int, items: List[Dict[str, Any]], total: float):
        with self._connect() as conn:
            cursor = conn.execute(
                "INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'pending')",
                (user_id, total),
            )
            order_id = cursor.lastrowid
            for item in items:
                conn.execute(
                    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                    (order_id, item["product_id"], item["quantity"], item["price"]),
                )
            conn.commit()
            return {"order_id": order_id, "status": "pending"}

    def list_orders(self):
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT orders.id, orders.user_id, orders.total, orders.status, users.first_name, users.last_name, users.email FROM orders JOIN users ON users.id = orders.user_id ORDER BY orders.id DESC"
            ).fetchall()
            return [dict(row) for row in rows]

    def update_order_status(self, order_id: int, status: str):
        with self._connect() as conn:
            conn.execute("UPDATE orders SET status = ? WHERE id = ?", (status, order_id))
            conn.commit()
            return self.list_orders()

    def save_reset_code(self, email: str, code: str):
        with self._connect() as conn:
            conn.execute("DELETE FROM password_resets WHERE email = ?", (email,))
            conn.execute("INSERT INTO password_resets (email, code) VALUES (?, ?)", (email, code))
            conn.commit()
            return {"email": email, "code": code}

    def get_reset_code(self, email: str):
        with self._connect() as conn:
            row = conn.execute(
                "SELECT code FROM password_resets WHERE email = ? ORDER BY id DESC LIMIT 1",
                (email,),
            ).fetchone()
            return dict(row) if row else None

    def save_verification_code(self, email: str, code: str):
        with self._connect() as conn:
            conn.execute("DELETE FROM verification_codes WHERE email = ?", (email,))
            conn.execute("INSERT INTO verification_codes (email, code) VALUES (?, ?)", (email, code))
            conn.commit()
            return {"email": email, "code": code}

    def verify_code(self, email: str, code: str):
        with self._connect() as conn:
            row = conn.execute(
                "SELECT code FROM verification_codes WHERE email = ? ORDER BY id DESC LIMIT 1",
                (email,),
            ).fetchone()
            return bool(row and row["code"] == code)

    def reset_password(self, email: str, code: str, password: str):
        with self._connect() as conn:
            row = conn.execute("SELECT code FROM password_resets WHERE email = ?", (email,)).fetchone()
            if row and row["code"] == code:
                conn.execute("UPDATE users SET password = ? WHERE email = ?", (password, email))
                conn.commit()
                return True
            return False


DB = StoreDB(DB_PATH)


def create_app():
    from routes.auth_routes import auth_bp
    from routes.product_routes import product_bp
    from routes.cart_routes import cart_bp
    from routes.wishlist_routes import wishlist_bp

    app.blueprint(auth_bp, url_prefix="")
    app.blueprint(product_bp, url_prefix="")
    app.blueprint(cart_bp, url_prefix="")
    app.blueprint(wishlist_bp, url_prefix="")

    @app.route("/health", methods=["GET"])
    def health():
        return app.jsonify({"status": "ok"})

    @app.route("/api/users", methods=["GET"])
    def list_users():
        return app.jsonify(DB.list_users())

    @app.route("/api/users/<int:id>", methods=["PUT"])
    def update_user(id):
        return app.jsonify(DB.update_user(id, request.json or {}))

    @app.route("/api/users/<int:id>", methods=["DELETE"])
    def delete_user(id):
        return app.jsonify(DB.delete_user(id))

    @app.route("/api/orders", methods=["GET"])
    def list_orders():
        return app.jsonify(DB.list_orders())

    @app.route("/api/orders", methods=["POST"])
    def create_order():
        payload = request.json or {}
        order = DB.create_order(payload.get("user_id"), payload.get("items", []), payload.get("total", 0))
        return app.jsonify(order, 201)

    @app.route("/api/orders/<int:id>", methods=["PUT"])
    def update_order(id):
        payload = request.json or {}
        return app.jsonify(DB.update_order_status(id, payload.get("status", "pending")))

    return app


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


