$(".submit").on("click", function () {
  var newReservation = {
    customerName: $("reserve_name".val().trim()),
    phoneNumber: $("reserve_phone".val().trim()),
    customerEmal: $("reserve_email".val().trim()),
    customerID: $("reserve_uniqueID".val().trim()),
  };

  var currentURL = window.location.origin;
  $.post(currentURL + "/api/tables", newReservation, function (data) {
    if (data) {
      alert("You are officially booked, sacred customer")
    }
    else {
      alert("You are on the waitlist, unfortunately...")
    }
    $("#reserve_name").val("");
    $("#reserve_phone").val("");
    $("#reserve_email").val("");
    $("#reserve_uniqueID").val("");
  })
})