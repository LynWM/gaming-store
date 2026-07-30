# Gaming Store API

## Overview
This Flask service powers the gaming-store experience with:
- authentication and password reset flows
- product CRUD for admin use
- cart persistence and order creation
- SQL-based data storage using SQLite
- Marshmallow-style schema support for structured payloads

## Endpoints
### Auth
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/verify
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Products
- GET /api/products
- POST /api/products
- PUT /api/products/<id>
- DELETE /api/products/<id>

### Cart
- GET /api/cart/<user_id>
- POST /api/cart/<user_id>
- DELETE /api/cart/<user_id>/<cart_id>

### Wishlist
- GET /api/wishlist/<user_id>
- POST /api/wishlist/<user_id>
- DELETE /api/wishlist/<user_id>/<wishlist_id>

### Orders
- GET /api/orders
- POST /api/orders
- PUT /api/orders/<id>

## Database schema
The API creates the following tables automatically on startup:
- users
- products
- orders
- order_items
- cart_items
- password_resets
- verification_codes

## Running locally
```bash
cd server
python3 app.py
```
