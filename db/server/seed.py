"""
Database seed script - Run this to populate your database with sample data
Usage: python seed.py
"""

from db.server.app import create_app, db
from db.server.models.user import User
from db.server.models.product import Product
from db.server.models.cart import Cart

def seed_database():
    app = create_app()
    
    with app.app_context():
        print("🗑️  Clearing existing data...")
        db.drop_all()
        db.create_all()
        
        # Create admin user
        print("👤 Creating admin user...")
        admin = User(
            username='admin',
            email='admin@gamingstore.com',
            first_name='Admin',
            last_name='User',
            is_admin=True
        )
        admin.set_password('admin123')
        db.session.add(admin)
        
        # Create sample users
        print("👥 Creating sample users...")
        users = []
        for i in range(3):
            user = User(
                username=f'user{i+1}',
                email=f'user{i+1}@gamingstore.com',
                first_name=f'User',
                last_name=f'{i+1}',
                is_admin=False
            )
            user.set_password('password123')
            users.append(user)
            db.session.add(user)
        
        db.session.commit()
        
        # Create sample products
        print("🎮 Creating sample products...")
        products = [
            Product(
                name='Elden Ring',
                description='A challenging action RPG',
                price=59.99,
                category='RPG',
                stock=50,
                image_url='/images/elden-ring.jpg',
                is_featured=True
            ),
            Product(
                name='Cyberpunk 2077',
                description='Futuristic action adventure',
                price=49.99,
                category='Action',
                stock=35,
                image_url='/images/cyberpunk.jpg',
                is_featured=True
            ),
            Product(
                name='The Last of Us Part II',
                description='Post-apocalyptic adventure',
                price=39.99,
                category='Adventure',
                stock=25,
                image_url='/images/last-of-us.jpg'
            ),
            Product(
                name='Hogwarts Legacy',
                description='Harry Potter action RPG',
                price=69.99,
                category='RPG',
                stock=60,
                image_url='/images/hogwarts.jpg',
                is_featured=True
            ),
            Product(
                name='Spider-Man 2',
                description='Marvel action game',
                price=69.99,
                category='Action',
                stock=40,
                image_url='/images/spiderman.jpg'
            ),
        ]
        
        for product in products:
            db.session.add(product)
        
        db.session.commit()
        
        # Create carts for users
        print("🛒 Creating shopping carts...")
        for user in users:
            cart = Cart(user_id=user.id)
            db.session.add(cart)
        
        db.session.commit()
        
        print("\n✅ Database seeding completed successfully!")
        print(f"   - Created 1 admin user and 3 regular users")
        print(f"   - Created 5 sample products")
        print(f"   - Created 3 shopping carts")

if __name__ == '__main__':
    seed_database()
