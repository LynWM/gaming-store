# Re-exports so other files can keep doing: from models import db, User, Product, ...
from models.category import Category as Category
from models.db import db as db
from models.deal import Deal as Deal
from models.order import Order as Order
from models.order_item import OrderItem as OrderItem
from models.product import Product as Product
from models.review import Review as Review
from models.user import User as User
