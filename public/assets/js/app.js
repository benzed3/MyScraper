$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {

        $("#articles").append("<p data-id='" +
            data[i]._id + "'>" +
            data[i].title + "<br />" +
            data[i].link + "<br />" +
            data[i].image + "<br />" +
            data[i].summary +
            "</p>");
    }
});

$(document).on("click", "#scrape", function () {
    alert("working");
    $.getJSON("/scrape", function (data) {

        for (var i = 0; i < data.length; i++) {

            $("#articles").append("<p data-id='" +
                data[i]._id + "'>" +
                data[i].title + "<br />" +
                data[i].link + "<br />" +
                data[i].image + "<br />" +
                data[i].summary +
                "</p>");
        }
    });
});