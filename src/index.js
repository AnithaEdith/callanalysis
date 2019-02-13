var simpleclassifier = require('./classify.js');
var express = require("express");
var app = express();

app.listen(3300, () => {
 console.log("Server running on port 3300");
});

app.get("/classifier", (req, res, next) => {
  res.json(simpleclassifier());
});
 
app.get("/", (req, res, next) => {
  res.send("Welcome to Call Analysis");
});
