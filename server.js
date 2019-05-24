var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

var app = express();

var db = require("./models");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/scraper_controller.js");

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chessdb";
mongoose.connect(MONGODB_URI);

var cheerio = require("cheerio");
var axios = require("axios");

console.log("\n***************\n" +
    "Here is the data from Chess.com" +
    "\n***************\n");

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

app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {

            res.json(dbArticle);
        })
        .catch(function (err) {

            res.json(err);
        });
});


app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
});
