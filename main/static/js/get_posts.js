$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/posts/all",
        data: "data",
        dataType: "dataType",
        success: function (response) {
            
        }
    });
});