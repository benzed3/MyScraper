
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
                "</p><p id=endText>Click on Title of the Article to Save!</p><hr>");
        }
    });

});

$(document).on("click", "p", function () {
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
                thisId + "'>" +
                "<u>Title</u>: " + data.title + "<br />" +
                "<u>Link</u>: " + data.link + "<br />" +
                "<u>Image</u>: " + data.image + "<br />" +
                "<u>Summary</u>: " + data.summary +
                "</p><button id='addNote'>Add Note</button><button id='clearArt'>Clear Article</button><hr>");

        });

});



$(document).on("click", "#clear", function () {

    $("#content").empty();
    $("#content").html("<h3>Oops!! No articles!!</h3>");
})

$(document).on("click", "#clearSaved", function () {

    $("#new").empty();
})

