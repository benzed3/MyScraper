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
    app.get("/scrape", function (req, res) {

        axios.get("https://www.chess.com").then(function (response) {

            var $ = cheerio.load(response.data);


            $("h2.post-preview-titlecontainer").each(function (i, element) {

                var result = {};

                result.title = $(this)
                    .parent()
                    .find("a")
                    .attr("title");
                result.link = $(this)
                    .find("a")
                    .attr("href");
                result.image = $(this)
                    .parent()
                    .find("img")
                    .attr("src");
                result.summary = $(this)
                    .parent()
                    .find("p")
                    .text().trim();

                db.Article.create(result)
                    .then(function (dbArticle) {

                        console.log(dbArticle);
                    })
                    .catch(function (err) {

                        console.log(err);
                    });
            });
            res.send("Scrape Complete!");
        });
    });
});