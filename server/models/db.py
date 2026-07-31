from flask_sqlalchemy import SQLAlchemy

# Single shared db instance, imported by every model file to avoid circular imports
db = SQLAlchemy()
