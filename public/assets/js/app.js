$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {

        $("#articles").append("<p data-id='" +
            data[i]._id + "'>" +
            "<u>Title</u>: " + data[i].title + "<br />" +
            "<u>Link</u>: " + data[i].link + "<br />" +
            "<u>Image</u>: " + data[i].image + "<br />" +
            "<u>Summary</u>: " + data[i].summary +
            "</p><hr id='break'>");
    }
});

$(document).on("click", "#scrape", function () {
    alert("Scraped!");
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (data) {
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

