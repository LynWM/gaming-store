from db.server.app import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, index=True)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False, index=True)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(500))
    is_active = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    cart_items = db.relationship('CartItem', backref='product', cascade='all, delete-orphan')
    order_items = db.relationship('OrderItem', backref='product', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'stock': self.stock,
            'image_url': self.image_url,
            'is_active': self.is_active,
            'is_featured': self.is_featured,
            'created_at': self.created_at.isoformat(),
        }
    
    def __repr__(self):
        return f'<Product {self.name}>'
