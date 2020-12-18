$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
//blank click handler
$("form-group").on("submit", () => {
  console.log("select");
});
// blank click handler
$("prodDisplay").on("submit", () => {
  console.log("select");
});
