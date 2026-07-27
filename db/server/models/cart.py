from db.server.app import db
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    items = db.relationship('CartItem', backref='cart', cascade='all, delete-orphan')
    
    def get_total(self):
        """Calculate total cart price"""
        return sum(item.get_subtotal() for item in self.items)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': [item.to_dict() for item in self.items],
            'total': self.get_total(),
            'created_at': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<Cart {self.id}>'


class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    price = db.Column(db.Float, nullable=False)  # Store price at time of adding to cart
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def get_subtotal(self):
        """Calculate subtotal for this item"""
        return self.price * self.quantity
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None,
            'quantity': self.quantity,
            'price': self.price,
            'subtotal': self.get_subtotal(),
        }
    
    def __repr__(self):
        return f'<CartItem {self.id}>'
