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

app.get("/article/:id", function (req, res) {
  let i = 0;

  return {
    id: i,
    title: faker.lorem.sentence(),
    data: faker.lorem.paragraphs(5),
  };
});

console.log('>>', process.env.PORT);
var listener = app.listen(10000, function () {
  console.log("Listening on port " + process.env.PORT || 8080);
});
