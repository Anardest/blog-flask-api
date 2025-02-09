# Blog Flask API

Простое API для блога на Flask с поддержкой регистрации, авторизации, создания постов и комментариев.

## 📌 Функционал
- Регистрация и авторизация пользователей (Flask-Login, AJAX)
- Создание, получение и управление постами
- Добавление комментариев к постам

---

## 📦 Установка и запуск

### 🔹 1. Клонирование репозитория
```sh
git clone https://github.com/Anardest/blog-flask-api.git
cd blog-flask-api
```

### 🔹 2. Создание виртуального окружения
```sh
python -m venv env
source env/bin/activate  # Для Linux/macOS
env\Scripts\activate  # Для Windows
```

### 🔹 3. Установка зависимостей
```sh
pip install -r requirements.txt
```

### 🔹 4. Настройка переменных окружения
Создай файл `.env` в корне проекта и добавь:
```ini
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///blog.db
```

### 🔹 5. Инициализация базы данных
```sh
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 🔹 6. Запуск сервера
```sh
flask run
```
Сервер будет доступен по адресу: `http://127.0.0.1:5000/`

---

## 📌 API Эндпоинты

### 🔹 Регистрация
**POST /users/register**
```json
{
  "username": "user123",
  "password": "password123"
}
```

### 🔹 Авторизация
**POST /users/login**
```json
{
  "username": "user123",
  "password": "password123"
}
```

---

## 📌 AJAX-запросы

Пример AJAX-запроса на отображение всех пользователей:
```js
$(document).ready(function () {
    $("#getUsers").click(function () {
        $.ajax({
            url: "/users/get", // Путь к Flask API
            type: "GET",
            dataType: "json",
            success: function (response) {
                $("#userList").empty(); // Очищаем список перед обновлением
                response.forEach(function (username) {
                    $("#userList").append("<li>" + username + "</li>");
                });
            },
            error: function (xhr, status, error) {
                console.error("Ошибка: ", error);
                $("#userList").html("<li style='color:red;'>Ошибка загрузки пользователей</li>");
            }
        });
    });
});
```

---

## 🛠 Используемые технологии
- **Flask** – основной фреймворк
- **Flask-Login** – управление сессиями пользователей
- **Flask-Migrate** – миграции базы данных
- **Flask-SQLAlchemy - базы данных
- **SQLite** – база данных по умолчанию
- **AJAX (jQuery)** – асинхронные запросы
- **Bootstrap** – стилизация фронтенда

---

## 📌 TODO (планы на улучшение)
- Добавить возможность редактирования/удаления постов и комментариев
- Добавить API документацию через Swagger

---

## 📜 Лицензия
MIT License © 2025

