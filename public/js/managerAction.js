const currentDay = moment().format("MMMM D, YYYY");
$("#date").text(currentDay);
/* eslint-disable prefer-arrow-callback */
// $(document).ready(function() {

console.log("working");
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);
});
// blank click handler
$("prodDisplay").on("submit", function() {
  console.log("select");
});

$("#managerForm").on("submit", function(event) {
  const taskList = $("#taskList").val();
  event.preventDefault();
  if (taskList === "newEmployee") {
    $(".modal").addClass("is-active");
  } else if (taskList === "refreshView") {
    console.log("reload");
    location.reload();
  } else if (taskList === "Logout") {
    window.location.replace("/logout");
  }
});

$(".delete").click(function() {
  $(".modal").removeClass("is-active");
});

$("#newUser").on("submit", function(event) {
  event.preventDefault();
  console.log("click");
  const newEmployeeData = {
    email: $(".emailInput")
      .val()
      .trim(),
    password: $(".passwordInput")
      .val()
      .trim()
  };
  addEmployee(newEmployeeData.email, newEmployeeData.password);
  console.log(newEmployeeData);
});
function addEmployee(email, password) {
  $.post("/api/user_employee", {
    email: email,
    password: password
  }).then(res => {
    console.log(res);
    if (res === "OK") {
      console.log("Okurr");
      location.reload();
    }
  });
}

const displayUserOrders = async () => {
  const employees = await $.get("/api/user_employees");
  console.log(employees);
};
displayUserOrders();
