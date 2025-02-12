$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/posts/all",
        dataType: "json",
        success: function (posts) {
            let postList = $('#postList');
            postList.empty();

            posts.forEach(function (post) {
                let postHtml = `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.content.substring(0, 200)}...</p>
                        <a href="/posts/${post.id}">Читать далее</a>
                    </div>
                    <hr>
                `;
                postList.append(postHtml);
            });
        },
        error: function() {
            $("#postList").html("<p>Ошибка загрузки постов</p>");
        }
    });
});