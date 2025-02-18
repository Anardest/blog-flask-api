$(document).ready(function () {
    let postId = "{{ post.id }}";
    $("#likeButton").click(function () { 
        let button = $(this);
        
        $.ajax({
            type: "POST",
            url: "/posts/${postId}/like",
            success: function (response) {
                $("#likeCount").text(response.likes);

                if (response.liked) {
                    button.addClass("btn-danger");
                } else {
                    button.removeClass("btn-danger");
                }
            },
            error: function (response) {
                alert("Ошибка! Не удалось поставить лайк.");
            }
        });
    });
});