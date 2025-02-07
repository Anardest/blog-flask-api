from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .routes import init_routes
from .models import User
from .extensions import db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Инициализация расширений 
    db.init_app(app)

    # Регистрация маршрутов из routes.py
    init_routes(app)

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)