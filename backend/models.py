from config import db
from datetime import time

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    time = db.Column(db.Time(), default=time(0, 0))
    colour = db.Column(db.String(7), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time.strftime("%H:%M:%S") if self.time else None,
            "colour": self.colour
        }