// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var url = String(process.env.HOSTNAME).split("-");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This route processes GET requests to "/"`
app.get("/", function (req, res) {
  res.send(
    '<h1>REST API</h1><p>A REST API starter using Express and body-parser.<br /><br />To test, curl the following and view the terminal logs:<br /><br /><i>curl -H "Content-Type: application/json" -X POST -d \'{"username":"test","data":"1234"}\' https://' +
      url[2] +
      ".sse.codesandbox.io/update<i></p>"
  );
  console.log("Received GET");
});

app.get("/big-data", function (req, res) {
  let i = 0;
  res.send(
    new Array(1000 * 1000).fill(1).map((id) => {
      i++;
      return {
        id: i,
        data: `test data ${id}`,
      };
    })
  );
  console.log("Received GET");
});
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.get("/big-data-slow", function (req, res) {
  let i = 0;
  delay(5000).then(() => {
    res.send(
      new Array(1000 * 1000).fill(1).map((id) => {
        i++;
        return {
          id: i,
          data: `test data ${id}`,
        };
      })
    );
  });
  console.log("Received slow");
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
