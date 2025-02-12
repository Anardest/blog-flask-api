$(document).ready(function () {
    let currentPage = 1;  // Начальная страница

    function loadPosts() {
        $.ajax({
            type: "GET",
            url: `/posts/all?page=${currentPage}`,
            dataType: "json",
            success: function (response) {
                let postList = $('#postList');

                response.posts.forEach(function (post) {
                    let postHtml = `
                        <div class="card mb-3 p-2" style="border-radius: 0;">
                            <div class="card-body">
                                <h3>${post.title}</h3><h6>Автор: ${post.author} - ${post.created_at}</h6>
                                <p>${post.content.substring(0, 200)}...</p>
                                <a href="/posts/${post.id}">Читать далее</a>
                            </div>
                        </div>
                    `;
                    postList.append(postHtml);
                });

                if (response.has_next) {
                    $("#loadMore").show();
                } else {
                    $("#loadMore").hide();
                }

                currentPage++;  // Увеличиваем номер страницы
            },
            error: function () {
                $("#postList").html("<p>Ошибка загрузки постов</p>");
            }
        });
    }

    // Первоначальная загрузка
    loadPosts();

    // Кнопка "Загрузить ещё"
    $("#loadMore").click(function () {
        loadPosts();
    });
});
