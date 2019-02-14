var simpleclassifier = require('./simpleclassifier.js');
var express = require("express");
var app = express();

app.listen(3300, () => {
 console.log("Server running on port 3300");
});

app.get("/classifier", async(req, res, next) => {
  res.json(await simpleclassifier());
});
 
app.get("/", (req, res, next) => {
  res.send("Welcome to Call Analysis");
});
