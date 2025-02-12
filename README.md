# Blog Flask API

Простое API для блога на Flask с поддержкой регистрации, авторизации, создания постов и комментариев.

## 📌 Функционал
- Регистрация и авторизация пользователей (Flask-Login, AJAX)
- Создание, получение и управление постами
- Добавление комментариев к постам
- Хранение паролей пользователей в виде хэша

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

# 📌 API Эндпоинты

## 🔐 Аутентификация

### 🔹 Регистрация пользователя
**`POST /users/register`**  
Регистрирует нового пользователя.  

**Пример запроса:**  
```json
{
  "username": "testuser",
  "password": "securepassword"
}
```
**Ответ:**  
```json
{
  "message": "Регистрация успешна!"
}
```

### 🔹 Вход в аккаунт
**`POST /users/login`**  
Аутентификация пользователя.  

**Пример запроса:**  
```json
{
  "username": "testuser",
  "password": "securepassword"
}
```
**Ответ:**  
```json
{
  "message": "Вход выполнен успешно"
}
```

### 🔹 Выход из аккаунта
**`POST /users/logout`**  
Выход из системы (требуется авторизация).  

**Ответ:**  
```json
{
  "message": "Выход выполнен успешно"
}
```

### 🔹 Получение профиля текущего пользователя
**`GET /users/profile`**  
Возвращает информацию о текущем авторизованном пользователе.  

**Ответ:**  
```json
{
  "username": "testuser"
}
```

---

## 📝 Посты

### 🔹 Создание поста
**`POST /posts/add`**  
Создаёт новый пост (требуется авторизация).  

**Пример запроса:**  
```json
{
  "title": "Мой первый пост",
  "content": "Это содержимое поста."
}
```
**Ответ:**  
```json
{
  "message": "Пост создан!"
}
```

### 🔹 Получение всех постов с пагинацией
**`GET /posts/all?page=<номер страницы>`**  
Возвращает список постов с пагинацией (по 5 постов на страницу).  

**Пример запроса:**  
```
GET /posts/all?page=1
```
**Ответ:**  
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Мой первый пост",
      "author": "testuser",
      "content": "Это содержимое поста.",
      "created_at": "2025-02-12 12:34"
    }
  ],
  "has_next": true
}
```

### 🔹 Получение конкретного поста
**`GET /posts/<post_id>`**  
Возвращает страницу с конкретным постом.  

---

## 💬 Комментарии

### 🔹 Добавление комментария к посту
**`POST /posts/<post_id>/comment/add`**  
Добавляет комментарий к посту (требуется авторизация).  

**Пример запроса:**  
```json
{
  "content": "Отличный пост!"
}
```
**Ответ:**  
```json
{
  "username": "testuser",
  "content": "Отличный пост!",
  "created_at": "2025-02-12 12:35"
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
- **Flask-SQLAlchemy** - базы данных
- **Flask-CKEditor** - редактор текста для написания постов
- **SQLite** – база данных по умолчанию
- **AJAX (jQuery)** – асинхронные запросы
- **Bootstrap** – стилизация фронтенда

---

## 📌 TODO (планы на улучшение)
- Добавить API документацию через Swagger

---

## 📜 Лицензия
MIT License © 2025

