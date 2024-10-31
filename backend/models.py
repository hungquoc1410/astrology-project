from config import db


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False, server_default="others")
    year = db.Column(db.String(80), nullable=False)
    month = db.Column(db.String(80), nullable=False)
    day = db.Column(db.String(80), nullable=False)
    place = db.Column(db.String(80), nullable=False)
    longitude = db.Column(db.String(80), nullable=False)
    lattitude = db.Column(db.String(80), nullable=False)
    timezone = db.Column(db.String(80), nullable=False)
    hour = db.Column(db.String(80), nullable=False)
    min = db.Column(db.String(80), nullable=False)
    sec = db.Column(db.String(80), nullable=False, server_default="0")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "year": self.year,
            "month": self.month,
            "day": self.day,
            "place": self.place,
            "longitude": self.longitude,
            "lattitude": self.lattitude,
            "timezone": self.timezone,
            "hour": self.hour,
            "min": self.min,
            "sec": self.sec,
        }
