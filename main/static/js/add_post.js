$(document).ready(function () {
    $('#addPost').submit(function (event) { 
        event.preventDefault();

        let title = $('#postTitle').val();
        let content = $('#postContent').val();

        $.ajax({
            type: "POST",
            url: "/posts/add",
            data: JSON.stringify({title: title, content: content}),
            contentType: "application/json",
            success: function (response) {
                $('#postTitle').empty();
                $('#postContent').empty();
                $('#messageWarning').text(response.message).hide();
                $('#messageSuccess').text(response.message).show();
                $('#messageSuccess').empty();
                $('#messageSuccess').html(response.message);
            },
            error: function (response) {
                $('#messageWarning').text(response.message).show();
                $('#messageSuccess').text(response.message).hide();
                $('#messageWarning').empty();
                $('#messageWarning').html(response.message);
            }
        });
        
    });
});