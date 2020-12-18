$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
// hide modal until ready for it...show will be the inverse
$(".modal").hide();
//blank click handler
$("form-group").on("submit", () => {
  console.log("select");
});
// blank click handler
$("prodDisplay").on("submit", () => {
  console.log("select");
});
