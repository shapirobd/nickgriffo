from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    filename = db.Column(db.Text, nullable=False)
    folder = db.Column(db.Text, nullable=False)

    @classmethod
    def add_all_imgs(cls, imgs, folder):
        for img in imgs:
            if (img != '.DS_Store'):
                new_img = Image(filename=img, folder=folder)
                db.session.add(new_img)

    @classmethod
    def serialize(cls, img):
        return {
            'filename': img.filename
        }