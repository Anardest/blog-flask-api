$(document).ready(function () {
    $('#hideFormAddPost').hide();
    $("#showFormAddPost").click(function () {
        $("#addPostCard").fadeIn();  // Показываем форму
        $("#showFormAddPost").hide();  // Скрываем кнопку "Создать пост"
        $("#hideFormAddPost").show();  // Показываем кнопку "Отмена"
    });

    $("#hideFormAddPost").click(function () {
        $("#addPostCard").fadeOut();  // Скрываем форму
        $("#hideFormAddPost").hide();  // Скрываем кнопку "Отмена"
        $("#showFormAddPost").show();  // Показываем кнопку "Создать пост"
    });
});
