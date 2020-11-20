import pdb
import os

from flask import Flask, session, request, render_template, redirect, g, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Scanner1Img

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgres:///nick_griffo_db'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")

connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/scanner_1_imgs')
def show_scanner_1_imgs():
    imgs = Scanner1Img.query.all()
    serialized_imgs = [Scanner1Img.serialize(img) for img in imgs]
    return jsonify(imgs=serialized_imgs)