from flask import jsonify
from .models import User
from .extensions import db

def init_routes(app):
    @app.route('/')
    def home():
        return "Hello world!"
    
    @app.route('/users')
    def get_users():
        users = User.query.all()
        return jsonify([user.username for user in users])