$(document).ready(() => {
  console.log("here is data");
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    $(".member-name").text(data.password);
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

$("newRepairOrder").on("Submit", event => {
  event.preventDefault();
  const repairOrderData = {
    repairOrderNumer: repairOrderNumberInput,
    vin: vinInput,
    yearMakeModel: yearMakeModelInput,
    name: nameInput,
    description: descriptionInput,
    hours: hoursInput
  };
  createRepairOrders(repairOrderData);
});

function createRepairOrders(repairOrderData) {
  $.post("/api/order", repairOrderData).then(res => {
    if (res === "OK") {
      window.reload();
    }
  });
}
