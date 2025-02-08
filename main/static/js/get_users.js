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