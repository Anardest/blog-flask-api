$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();

        $.ajax({
            type: "POST",
            url: "/users/login",
            contentType: "application/json",
            data: JSON.stringify({username: username, password: password}),
            success: function (response) {
                // $("#loginUsername").val("");  // Очищаем поля
                // $("#loginPassword").val("");
                // $('#userMessageWarning').text(response.message).hide();
                // $('#userMessageSuccess').text(response.message).show();
                // $('#userMessageSuccess').empty();
                // $('#userMessageSuccess').html(response.message);
                window.location.href = "/";
            },
            error: function (response) {
                $('#userMessageSuccess').text(response.message).hide();
                $('#userMessageWarning').text(response.message).show();
                $('#userMessageWarning').empty();
                $('#userMessageWarning').html('Не верный логин или пароль!');
            }
        });
    });
});