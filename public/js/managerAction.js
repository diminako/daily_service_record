/* eslint-disable prefer-arrow-callback */
$(document).ready(function() {
  console.log("working");
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  //blank click handler
  $("form-group").on("submit", function() {
    console.log("select");
  });
  // blank click handler
  $("prodDisplay").on("submit", function() {
    console.log("select");
  });

  $("newEmployee").on("submit", function(event) {
    event.preventDefault();
    if (tasklist === "newEmployee") {
      $(".modal").addClass("is-active");
    }
  });

  $(".newUser").on("submit", function(event) {
    event.preventDefault();
    const newEmployeeData = {
      email: $(".emailInput").val(),
      password: $(".passwordInput").val()
    };
    addEmployee(newEmployeeData);
  });
  function addEmployee(newEmployeeData) {
    $.post("/api/employee/create", newEmployeeData).then(res => {
      if (res === "OK") {
        location.reload();
      }
    });
  }
});
