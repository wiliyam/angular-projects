var express = require("express");
var config = require("./config");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var autoIncrement = require("mongoose-auto-increment");
var cors = require("cors");

var port = process.env.PORT || config.port;
var app = express();
app.use(express.static("public"));

mongoose.connect(config.database, function(err) {
  if (!err) {
    console.log("Mongoose is Successfully connect with Database...");
  } else {
    console.log("Sorry Mongoose is not connect with Database!!!");
  }
});
autoIncrement.initialize(mongoose.connection);
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
var enableCORS = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, token, Content-Length, X-Requested-With, *"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(enableCORS);
app.use(cors());

var models_path = __dirname + "/model";
fs.readdirSync(models_path).forEach(function(file) {
  if (~file.indexOf(".js")) require(models_path + "/" + file);
});

// routes file
require("./routes")(app);

// listen in server
app.listen(port, () => console.log(`Server on port ${port}`));
