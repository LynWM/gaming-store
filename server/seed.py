from datetime import datetime, timedelta

from app import app
from models import Category, Deal, Product, User, db

with app.app_context():
    db.drop_all()
    db.create_all()

    # Users
    admin = User(first_name="Admin", last_name="User", username="admin",
                 email="admin@test.com", password="admin123", role="admin")
    jane = User(first_name="Jane", last_name="Doe", username="janedoe",
                email="jane@test.com", password="password123", role="customer")
    db.session.add_all([admin, jane])

    # Categories
    category_data = [
        ("Consoles", "consoles"),
        ("Games", "games"),
        ("Monitors", "monitors"),
        ("Laptops", "laptops"),
        ("Board Games", "board-games"),
        ("Accessories", "accessories"),
        ("Services", "services"),
        ("Tournaments", "tournaments"),
    ]
    categories = {}
    for name, slug in category_data:
        cat = Category(name=name, slug=slug)
        db.session.add(cat)
        categories[slug] = cat
    db.session.flush()  # get category IDs before using them below

    products_by_name = {}  # tracks created products so Deals can reference them by name

    def add_product(name, description, price, slug, image=""):
        p = Product(
            name=name,
            description=description,
            price=price,
            stock=30,
            image=image,
            category_id=categories[slug].id,
        )
        db.session.add(p)
        products_by_name[name] = p
        return p

    # Flash deal products
    flash_deal_products = [
        ("Xbox Series X", "1TB, 4K 120fps Gaming", 49999, "consoles",
         "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800", 20),
        ("PS5 Slim Digital", "Compact Edition, No Disc", 39999, "consoles",
         "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800", 13),
        ("Cyberpunk 2077", "PC Digital Download", 4999, "games",
         "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800", 40),
        ("God of War Ragnarök", "PS5 Exclusive", 6999, "games",
         "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800", 29),
        ("Nintendo Switch OLED", "Portable Gaming Console", 34999, "consoles",
         "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800", 14),
        ("ASUS ROG Monitor", "27'' 165Hz IPS", 32999, "monitors",
         "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800", 15),
        ("SteelSeries Headset", "7.1 Surround Sound", 9999, "accessories",
         "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800", 20),
        ("Logitech G Pro X", "Mechanical Gaming Keyboard", 14999, "accessories",
         "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800", 20),
        ("Razer DeathAdder V3", "Wireless Gaming Mouse", 8999, "accessories",
         "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800", 22),
        ("RTX 4080", "16GB Graphics Card", 119999, "accessories",
         "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800", 17),
        ("MSI Gaming Laptop", "RTX 4070 - Intel i9", 189999, "laptops",
         "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800", 11),
        ("DualSense Controller", "Wireless PS5 Controller", 7999, "accessories",
         "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800", 25),
    ]

    now = datetime.utcnow()
    for i, (name, desc, price, slug, image, discount) in enumerate(flash_deal_products):
        add_product(name, desc, price, slug, image)
        db.session.flush()

        deal = Deal(
            product_id=products_by_name[name].id,
            discount_percent=discount,
            starts_at=now,
            ends_at=now + timedelta(days=7, minutes=30 - i, seconds=17),
            is_active=True,
        )
        db.session.add(deal)

    # Filler products per category
    category_names = {
        "consoles": ["PlayStation 5 Pro", "Nintendo Switch 2", "Xbox Series S",
                     "Steam Deck OLED", "ROG Ally X", "PS5 Spider-Man Bundle"],
        "games": ["Elden Ring: Shadow", "Horizon Forbidden West", "Starfield",
                  "Baldur's Gate 3", "Spider-Man 2", "Zelda: Echoes", "Diablo IV"],
        "monitors": ["27\" 4K IPS Monitor", "34\" Ultra-Wide QHD", "24\" 240Hz Esports",
                     "32\" Curved VA", "27\" OLED Gaming", "49\" Super Ultra-Wide",
                     "25\" 360Hz Competitive", "28\" 4K HDR600"],
        "laptops": ["Razer Blade 16", "ASUS ROG Zephyrus", "Alienware m18",
                    "Lenovo Legion Pro 7", "MSI Titan GT77", "ASUS TUF A15",
                    "HP Omen 17", "Acer Predator Helios"],
        "board-games": ["Catan: Legacy", "Wingspan Deluxe", "Gloomhaven",
                        "Ticket to Ride", "Terraforming Mars", "Root", "Azul",
                        "Brass: Birmingham"],
        "accessories": ["Pro Wireless Controller", "RGB Mechanical Keyboard",
                        "8K HDMI Cable", "Elite Headset", "Ergo Gaming Chair",
                        "4-Port Controller Charger", "Capture Card 4K60", "Wrist Rest Pad"],
        "services": ["Console Deep Clean", "PC Build Consultation", "Controller Drift Repair",
                     "GPU Thermal Repaste", "Custom PC Build", "Data Transfer Service",
                     "Warranty Diagnostic", "Setup & Calibration"],
        "tournaments": ["Valorant Open Qualifier", "Smash Ultimate Regional", "Rocket League 3v3",
                        "FIFA Ultimate Cup", "CS2 Community Clash", "Apex Legends Trios",
                        "Street Fighter 6 Showdown", "Fortnite Duos Cup"],
    }

    category_fallback_images = {
        "consoles": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
        "games": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
        "monitors": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
        "laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
        "board-games": "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=800",
        "accessories": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
        "services": "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800",
        "tournaments": "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800",
    }

    for slug, names in category_names.items():
        for i, name in enumerate(names):
            if name in products_by_name:
                continue
            base_price = 2999 + (i * 1500) + (len(slug) * 700)
            add_product(
                name,
                f"{name} — quality gear for your setup",
                base_price,
                slug,
                category_fallback_images.get(slug, "")
        )

    db.session.commit()

    print("Seed complete:")
    print(f" - {User.query.count()} users")
    print(f" - {Category.query.count()} categories")
    print(f" - {Product.query.count()} products")
    print(f" - {Deal.query.count()} active flash deals")