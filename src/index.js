// init project
var express = require("express");
var bodyParser = require("body-parser");
var { faker } = require("@faker-js/faker");
var app = express();
var url = String(process.env.HOSTNAME).split("-");

var factor = 1000 * 10;
var delayFactor = 5000;
var delayArticleFactor = 50;

let i = 0;
var preBuild = new Array(factor).fill(1).map(() => {
  i++;
  return {
    id: i,
    title: faker.lorem.sentence(),
    data: faker.lorem.paragraphs(5),
  };
});

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This route processes GET requests to "/"`
app.get("/", function (req, res) {
  res.send("<h1>FAKE API</h1>");
  console.log("Received GET");
});

app.get("/ids", function (req, res) {
  let i = 0;
  res.send(
    new Array(factor).fill(1).map((id) => {
      i++;
      return i;
    })
  );
  console.log("Received GET");
});

app.get("/big-data", function (req, res) {
  let i = 0;
  res.send(preBuild);
  console.log("Received GET");
});

app.get("/big-data-slow", function (req, res) {
  let i = 0;
  delay(delayFactor).then(() => {
    res.send(preBuild);
  });
  console.log("Received slow");
});

app.get("/article/:articleId", function (req, res, next) {
  let i = 0;
  try {
    if (Number(req.params.articleId) === 9900)
      throw new Error("Internal Server Error");
    res.send(preBuild[req.params.articleId - 1]);
  } catch (err) {
    next(err);
  }
});

const isLocal = !!process.env.LOCAL_RUN;
const port = isLocal ? 8080 : 10000;
console.log("isLocal>>", isLocal);
console.log("port>>", port);
var listener = app.listen(port, function () {
  console.log("Listening on port " + port);
});
