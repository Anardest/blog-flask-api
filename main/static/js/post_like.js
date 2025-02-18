$(document).on("click", ".like-btn", function () {
    let button = $(this);
    let postId = button.data("post-id");

    $.ajax({
        type: "POST",
        url: `/posts/${postId}/like`,
        success: function (response) {
            button.find(".like-count").text(response.likes);

            if (response.liked) {
                button.addClass("btn-danger");
            } else {
                button.removeClass("btn-danger");
            }
        },
        error: function (xhr) {
            console.error("Ошибка лайка:", xhr.responseText);
            alert("Ошибка! Не удалось поставить лайк.");
        }
    });
});
