$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/users/profile",
        success: function (response) {
            $("#loginBtn").hide();
            $("#logoutBtn").show();
        },
        error: function () {
            $("#loginBtn").show();
            $("#logoutBtn").hide();
        }
    });


    $('#logoutBtn').click(function () {
        $.ajax({
            type: "POST",
            url: "/users/logout",
            success: function (response) {
                location.reload();
            }
        });
    });
});