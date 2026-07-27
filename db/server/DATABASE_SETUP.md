# Database Setup Guide

## 📦 Installation

1. **Install dependencies** (from server directory):
```bash
pipenv install
pipenv shell
```

2. **Run the app** (creates database automatically):
```bash
python app.py
```

The database will be created at `server/gaming_store.db` with all tables.

## 🌱 Seed Sample Data

To populate the database with sample data:
```bash
python seed.py
```

This creates:
- 1 admin user (username: `admin`, password: `admin123`)
- 3 sample users (user1-3, password: `password123`)
- 5 gaming products with categories
- 3 shopping carts

## 📊 Database Schema

### Users Table
- `id` (primary key)
- `username` (unique)
- `email` (unique)
- `password_hash`
- `first_name`, `last_name`
- `is_admin` (boolean)
- `is_active` (boolean)
- `created_at`, `updated_at`

### Products Table
- `id` (primary key)
- `name`, `description`
- `price`, `stock`
- `category`
- `image_url`
- `is_active`, `is_featured`
- `created_at`, `updated_at`

### Carts Table
- `id` (primary key)
- `user_id` (foreign key)
- `created_at`, `updated_at`

### Cart Items Table
- `id` (primary key)
- `cart_id`, `product_id` (foreign keys)
- `quantity`, `price`
- `created_at`

### Orders Table
- `id` (primary key)
- `user_id` (foreign key)
- `status` (pending/confirmed/shipped/delivered/cancelled)
- `total_amount`
- `shipping_address`
- `created_at`, `updated_at`

### Order Items Table
- `id` (primary key)
- `order_id`, `product_id` (foreign keys)
- `quantity`, `price`

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Create new user
- `POST /login` - User login

### Products Routes (`/api/products`)
- `GET /` - Get all products
- `GET /<id>` - Get single product
- `POST /` - Create product (admin)
- `PUT /<id>` - Update product (admin)
- `DELETE /<id>` - Delete product (admin)
- `GET /categories` - Get all categories

### Cart Routes (`/api/cart`)
- `GET /<user_id>` - Get user's cart
- `POST /<user_id>/add` - Add item to cart
- `DELETE /<user_id>/remove/<item_id>` - Remove item
- `PUT /<user_id>/update/<item_id>` - Update quantity
- `DELETE /<user_id>/clear` - Clear cart

## 💡 Usage Examples

### Register a user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Add item to cart
```bash
curl -X POST http://localhost:5000/api/cart/1/add \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

## 🔐 Notes

- Passwords are hashed using werkzeug
- SQLite database for development
- For production, use PostgreSQL (change `SQLALCHEMY_DATABASE_URI`)
- Add authentication middleware for protected routes
- Implement role-based access control for admin endpoints
