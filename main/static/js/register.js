$(document).ready(function () {
    $('#registerForm').submit(function (event) {
        event.preventDefault();
        let username = $('#registerUsername').val();
        let password = $('#registerPassword').val();

        $.ajax({
            type: "POST",
            url: "/users/register",
            contentType: "application/json",
            data: JSON.stringify({username: username, password: password}),
            success: function (response) {
                $("#registerUsername").val("");  // Очищаем поля
                $("#registerPassword").val("");
                $('#userMessageWarning').text(response.message).hide();
                $('#userMessageSuccess').text(response.message).show();
                $('#userMessageSuccess').empty();
                $('#userMessageSuccess').html(response.message);
            },
            error: function (response) {
                $('#userMessageSuccess').text(response.message).hide();
                $('#userMessageWarning').text(response.message).show();
                $('#userMessageWarning').empty();
                $('#userMessageWarning').html('Ошибка добавления пользователя!');
            }
        });
    });
});