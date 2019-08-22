var express = require("express");

var app = express();

var myLogger2 = function(req, res, next) {
  console.log("LOGGED2");
  next("tight");
};

var myLogger = function(req, res, next) {
  console.log(req);
  next();
};

app.use(myLogger2);
app.use(myLogger);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000);
