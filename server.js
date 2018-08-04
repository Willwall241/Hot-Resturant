//----------------------------------------------------------------------------------------------------------------------
//SERVER SETUP AND DEPENDENCIES
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4004;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
//-------------------------------------------------------------------------------------------
//ROUTES DISPLAYING HTML PAGES
//code for displaying the HTML page when we get it
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
//------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------
//ARRAY VARIABLES
//variables for holding the data of people being dynamically entered
var reserve = [];
var tables = [];
//--------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//ROUTING FOR TABLE DATA
// Displays all reserve data objects
app.get("/api/reserve", function (req, res) {
  return res.json(reserve);
});
// Displays a single person in the reserve array of objects, or returns false
app.get("/api/reserve/:name", function (req, res) {
  var chosen = req.params.name;
  for (var i = 0; i < reserve.length; i++) {
    if (chosen === reserve[i].routeName) {
      return res.json(reserve[i]);
    }
  }
  return res.json(false);
});
//Displays all people in the tables
app.get("/api/tables", function (req, res) {
  return res.json(reserve);
});
// Displays a single person in the tables array of objects, or returns false
app.get("/api/tables/:name", function (req, res) {
  var chosen = req.params.name;
  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }
  return res.json(false);
});
//-------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
//ROUTING FOR ADDING NEW DATA OBJECTS
//POST method for adding a new reserved data object
app.post("/api/reserve", function(req, res) {
  var newReserve = req.body;
  newReserve.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  if (reserve.length < 5){
    reserve.push(newReserve);
    res.json(true);
  }
  else {
    tables.push(newReserve);
    res.json(false);
  }
});

