from flask import jsonify, render_template, request
from .models import User
from .extensions import db

def init_routes(app):
    @app.route('/')
    def home():
        return render_template('index.html')
    
    @app.route('/users/get', methods=["GET"])
    def get_users():
        users = User.query.all()
        return jsonify([user.username for user in users])
    
    @app.route('/users/add', methods=['POST'])
    def add_users():
        data = request.get_json()
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'message':'Все поля должны быть заполнены!'}), 400
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message':'Такой пользователь уже существует!'}), 400
        
        new_user = User(username = data['username'], password = data['password'])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message':'Пользователь успешно добавлен!'})