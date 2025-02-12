from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .routes import init_routes
from .models import User
from .extensions import db, login, migrate, ckeditor
from config import Config
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)


    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    # Инициализация расширений 
    db.init_app(app)
    login.init_app(app)
    migrate.init_app(app, db)
    ckeditor.init_app(app)

    # Регистрация маршрутов из routes.py
    init_routes(app)

    login.login_view = 'login'

    @login.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))


    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)