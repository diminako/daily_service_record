$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  $("#employeeForm").on("submit", event => {
    event.preventDefault();
    $(".modal").css({ display: "block" });
  });
  // blank click handler
  $("prodDisplay").on("submit", () => {
    console.log("select");
  });
});
