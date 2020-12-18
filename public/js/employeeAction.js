const taskList = $("#taskList").val();

$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
// hide modal until ready for it ... show will be the inverse
$(".modal").hide();
//blank click handler
$(".empTaskBlk").on("submit", () => {
  console.log("select");
  switch (taskList) {
  case "New Job":
    $(".modal").show();
    break;
  }
});
// blank click handler
$("prodDisplay").on("submit", () => {
  console.log("select");
});
