const taskList = $("#taskList").val();
console.log("test");
$(document).ready(() => {
  console.log("here is data");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    $(".member-name").text(data.password);
  });
  $("#employeeForm").on("submit", function(event) {
    console.log("here")
    event.preventDefault();
    if (taskList === "New") {
      $(".modal").addClass("is-active");
    }
  });
  // blank click handler
  $("prodDisplay").on("submit", () => {
    console.log("select");
  });
  $(".newJob").on("submit", function(event) {
    event.preventDefault();
    const repairOrderData = {
      repairOrderNumber: $("#repairOrderNumber").val(),
      vin: $("#vin").val(),
      yearMakeModel: $("#yearMakeModel").val(),
      name: $("#name").val(),
      description: $("#description").val(),
      hours: $("#hours").val()
    };
    createRepairOrders(repairOrderData);
  });
  function createRepairOrders(repairOrderData) {
    $.post("/api/order", repairOrderData).then(res => {
      if (res === "OK") {
        location.reload();
      }
    });
  }
  $("#close").click(function() {
    $(".modal").removeClass("is-active");
  });
});
