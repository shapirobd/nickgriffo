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
            'id': img.id,
            'filename': img.filename
        }


    

# class User(db.Model):
#     __tablename__ = 'users'

#     username = db.Column(db.String(25), primary_key=True,
#                          unique=True, nullable=False)
#     password = db.Column(db.String, nullable=False)
#     email = db.Column(db.Text, unique=True, nullable=False)
#     image_url = db.Column(
#         db.Text, default="/static/images/default_prof_pic.png")
#     bookmarked_cards = db.relationship(
#         'Card', secondary='bookmarks', backref='user')
#     decks = db.relationship('Deck', backref='user')
#     friends = db.relationship('User', secondary='friendships', primaryjoin=(
#         Friendship.user1_username == username), secondaryjoin=(Friendship.user2_username == username))
#     posts = db.relationship('Post', backref='user')

#     @classmethod
#     def signup(cls, username, password, email, image_url):

#         hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

#         user = User(username=username, password=hashed_pwd,
#                     email=email, image_url=image_url)
#         db.session.add(user)
#         return user

#     @classmethod
#     def authenticate(cls, username, password):

#         user = cls.query.filter_by(username=username).first()
#         if user:
#             is_auth = bcrypt.check_password_hash(user.password, password)
#             if is_auth:
#                 return user
#         return False
