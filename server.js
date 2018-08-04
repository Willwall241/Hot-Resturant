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
app.post("/api/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReserve = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReserve.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReserve);

  reserve.push(newReserve);

  res.json(newReserve);
});

//POST method for adding a new waitlist data object
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});


$(".submit").on("click", function () {

  // Here we grab the form elements
  var newReservation = {
    customerName: $('#reserve_name').val().trim(),
    phoneNumber: $('#reserve_phone').val().trim(),
    customerEmail: $('#reserve_email').val().trim(),
    customerID: $('#reserve_uniqueID').val().trim()
  };

  console.log(newReservation);

  // This line is the magic. It's very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  // Here we get the location of the root page.
  // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
  var currentURL = window.location.origin;

  $.post(currentURL + "/api/tables", newReservation,
    function (data) {

      // If a table is available... tell user they are booked.
      if (data == true) {
        alert("Yay! You are officially booked!")
      }

      // If a table is available... tell user they on the waiting list.
      if (data == false) {
        alert("Sorry you are on the wait list")
      }

      // Clear the form when submitting
      $('#reserve_name').val("");
      $('#reserve_phone').val("");
      $('#reserve_email').val("");
      $('#reserve_uniqueID').val("");

    });

  return false;

});

