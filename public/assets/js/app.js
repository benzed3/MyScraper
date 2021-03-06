
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
                "</p><p id=endText>Click on Title of the Article ONLY to Save!</p><hr>");
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

            $("#new").append("<h4>" + data.title + "</h4>");
            $("#new").append("<h5>Summary: " + data.summary + "</h5>");
            $("#new").append("<input id='titleinput' name='title' ><br>");
            $("#new").append("<textarea id='bodyinput' name='body'></textarea><br>");
            $("#new").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button><button data-id='" +
                data._id + "' id='delete'>Clear Article</button>");

            if (data.note) {

                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }

        });

});



$(document).on("click", "#clear", function () {

    $("#content").empty();
    $("#content").html("<h3>Oops!! No articles!!</h3>");
})

$(document).on("click", "#clearSaved", function () {

    $("#new").empty();
})

$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
        });


    $("#titleinput").val("");
    $("#bodyinput").val("");
    alert("note added");
});

$(document).on("click", "#delete", function () {
    alert("Article Deleted");

    var a = $(this).attr("data-id");
    $("#new").empty(a);
});