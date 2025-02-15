$(document).ready(function () {
    $('#commentsList').on('click', '.comment', function () {
        let username = $(this).data('username') || $(this).find('.mention').text().replace('@', '');
        let currentText = $('#commentContent').val();

        // Добавляем @username в начало или в конец
        $('#commentContent').val('@' + username + ' ' + currentText);
        $('#commentContent').focus();
    });
});