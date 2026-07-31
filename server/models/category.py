from models.db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    slug = db.Column(db.Text, unique=True, nullable=False)

    products = db.relationship("Product", backref="category", cascade="all, delete-orphan")

    def to_dict(self):
        return {"id": self.id, "name": self.name, "slug": self.slug}
