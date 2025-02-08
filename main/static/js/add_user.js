$(document).ready(function () {
    $('#userCreate').submit(function (event) {
        event.preventDefault();

        let username = $('#inputName').val();
        let password = $('#inputPassword').val();

        $.ajax({
            type: "POST",
            url: "/users/add",
            contentType: "application/json",
            data: JSON.stringify({username: username, password: password}),
            success: function (response) {
                $("#inputName").val("");  // Очищаем поля
                $("#inputPassword").val("");
                $("#getUsers").click();
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