from flask import jsonify, render_template, request, redirect
from .models import User, Post, Comment
from .extensions import db
from flask_login import current_user, login_user, login_required, logout_user
from .forms import LoginForm
import markdown

def init_routes(app):

    # Главная страница
    @app.route('/')
    def home():
        return render_template('index.html', user=current_user)
    
    @app.route('/authorization')
    def reg_html():
        return render_template('register.html')
    

    # 
    # АККАУНТ, РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ
    # 

    # Регистрация
    @app.route('/users/register', methods=['POST'])
    def register():
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Пользователь уже существует!"}), 400
        
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message':'Регистрация успешна!'}), 201
    

    # Вход в аккаунт
    @app.route('/users/login', methods=['POST'])
    def login():
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return jsonify({'message':'Неверные данные для входа!'}), 401
        
        login_user(user)
        return jsonify({'message': 'Вход выполнен успешно'}), 200
    
    # Выход из аккаунта
    @app.route('/users/logout', methods=['POST'])
    @login_required
    def logout():
        logout_user()
        return jsonify({"message": "Выход выполнен успешно"}), 200
    
    # Проверка: авторизован ли пользователь?
    @app.route('/users/profile', methods=['GET'])
    @login_required
    def profile():
        return jsonify({"username": current_user.username})
    

    # 
    # ПОСТЫ
    # 

    # СОЗДАНИЕ ПОСТА
    @app.route('/posts/add', methods=['POST'])
    @login_required
    def add_post():
        data = request.get_json()
        new_post = Post(title=data['title'], content=data['content'], user_id = current_user.id)

        db.session.add(new_post)
        db.session.commit()

        return jsonify({"message": "Пост создан!"}), 201
    
    # ВСЕ ПОСТЫ
    @app.route('/posts/all', methods=['GET'])
    @login_required
    def get_posts():
        posts = Post.query.all()
        return jsonify([{
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'created_at': post.created_at.strftime('%Y-%m-%d %H:%M'),
        'author': post.user.username
    } for post in posts])

    # КОНКРЕТНЫЙ ПОСТ
    @app.route('/posts/<int:post_id>')
    def post_page(post_id):
        post = Post.query.get(post_id)
        if not post:
            return render_template('404.html'), 404  # Если поста нет, отдаём 404 страницу

        post.content = markdown.markdown(post.content)
        return render_template('post.html', post=post)
    
