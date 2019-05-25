
$(document).on("click", "#scrape", function () {
    alert("Scraped!");
    $("#content").empty();
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {

                $("#content").append("<p data-id='" +
                    data[i]._id + "'>" +
                    data[i].title + "<br />" +
                    data[i].link + "<br />" +
                    data[i].image + "<br />" +
                    data[i].summary +
                    "</p>");
            }
        });
    $.getJSON("/articles", function (data) {

        for (var i = 0; i < data.length; i++) {

            $("#content").append("<p data-id='" +
                data[i]._id + "'>" +
                "<u>Title</u>: " + data[i].title + "<br />" +
                "<u>Link</u>: " + data[i].link + "<br />" +
                "<u>Image</u>: " + data[i].image + "<br />" +
                "<u>Summary</u>: " + data[i].summary +
                "</p><button id='saveArt'>Save Article</button><hr>");
        }
    });

});

$(document).on("click", "#saveArt", function () {
    alert("Saved!");

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $(this).title,
            link: $(this).link,
            image: $(this).image,
            summary: $(this).summary
        }
    })
        .then(function (data) {
            console.log(data);

            $("#new").append("<p data-id='" +
                data._id + "'>" +
                data.title + "<br />" +
                data.link + "<br />" +
                data.image + "<br />" +
                data.summary +
                "</p>");

        });

});

$(document).on("click", "saved")

$(document).on("click", "#clear", function () {

    $("#content").empty();
    $("#content").html("<h2>Oops!! No articles!!</h2>");
})

