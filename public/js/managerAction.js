$(document).ready(() => {
  console.log("working");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  //blank click handler
  $("form-group").on("submit", () => {
    console.log("select");
  });
  // blank click handler
  $("prodDisplay").on("submit", () => {
    console.log("select");
  });

  $("newEmployee").on("submit", event => {
    event.preventDefault();
    const newEmployeeData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    addEmployee(newEmployeeData);
  });

  function addEmployee(newEmployeeData) {
    $.post("/api/employee/create", newEmployeeData).then(res => {
      if (res === "OK") {
        window.reload();
      }
    });
  }
});
