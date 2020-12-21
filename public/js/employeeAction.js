$(document).ready(() => {
  let orderArray = [];
  let dateFilter = $("#dateTaskList").val();
  const currentDay = moment().format("MMMM D, YYYY");
  $("#date").text(currentDay);

  const updatedOrders = orders.map(o =>
    Object.assign(o, { createdAt: moment(new Date(o.createdAt)).format("L") })
  );

  if (dateFilter === "Daily") {
    updatedOrders.reduce(function(res, value) {
      if (!res[value.createdAt]) {
        res[value.createdAt] = { Date: value.createdAt, hours: 0 };
        orderArray.push(res[value.createdAt]);
      }
      res[value.createdAt].hours += value.hours;
      return res;
    }, {});
  }

  //parameters for line graph
  const width = d3
    .select("#lineGraph")
    .node()
    .getBoundingClientRect().width;
  const height = d3
    .select("#lineGraph")
    .node()
    .getBoundingClientRect().height;

  const x = d3.scaleOrdinal().range([0, width - 70]);
  x.domain(
    d3.extent(orderArray, function(d) {
      return d.Date;
    })
  );

  const y = d3.scaleLinear().range([height - 50, 10]);
  y.domain([
    0,
    d3.max(orderArray, function(d) {
      return d.hours;
    })
  ]);

  const g = d3.select("#lineGraph").append("g");

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    $(".member-name").text(data.password);
  });
  // shows the modal if the user selects new or logs out
  $("#employeeForm").on("submit", function(event) {
    const taskList = $("#taskList").val();
    console.log(taskList);
    event.preventDefault();
    if (taskList === "New") {
      $("#newOrder").addClass("is-active");
    } else if (taskList === "Logout") {
      window.location.replace("/logout");
    }
  });
  // blank click handler
  $("prodDisplay").on("submit", () => {
    console.log("select");
  });
  // creates the variable of the information that is in the modal
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
  // posts the new info to the api
  function createRepairOrders(repairOrderData) {
    $.post("/api/order", repairOrderData).then(res => {
      if (res === "OK") {
        location.reload();
      }
    });
  }
  // Edit Order JavaScript
  $(".editJob").on("submit", function(event) {
    event.preventDefault();
    const editRepairOrderData = {
      id: $("#idEdit").val(),
      repairOrderNumber: $("#repairOrderNumberEdit").val(),
      vin: $("#vinEdit").val(),
      yearMakeModel: $("#yearMakeModelEdit").val(),
      name: $("#nameEdit").val(),
      description: $("#descriptionEdit").val(),
      hours: $("#hoursEdit").val()
    };
    updateOrder(editRepairOrderData);
  });
  // updates the order
  function updateOrder(editRepairOrderData) {
    $.ajax({
      method: "PUT",
      url: "/api/order",
      data: editRepairOrderData
    }).then(function() {
      location.reload();
    });
  }
  // hides the modal if the delete button is clicked
  $(".delete").click(function() {
    $(".modal").removeClass("is-active");
  });

  $("#dateFilter").on("submit", function(event) {
    event.preventDefault();
    dateFilter = $("#dateTaskList").val();
    if (dateFilter === "Daily") {
      orderArray = [];
      updatedOrders.reduce(function(res, value) {
        if (!res[value.createdAt]) {
          res[value.createdAt] = { Date: value.createdAt, hours: 0 };
          orderArray.push(res[value.createdAt]);
        }
        res[value.createdAt].hours += value.hours;
        return res;
      }, {});
      console.log(orderArray);
    } else if (dateFilter === "Bi-Weekly") {
      orderArray = [];
      const currentTime = new Date();
      const fortnightAway = new Date(Date.now() - 12096e5);
      const biWeeklyDates = updatedOrders.filter(function(d) {
        const date = new Date(d.createdAt);
        return date <= currentTime && date >= fortnightAway;
      });
      biWeeklyDates.reduce(function(res, value) {
        if (!res[value.createdAt]) {
          res[value.createdAt] = { Date: value.createdAt, hours: 0 };
          orderArray.push(res[value.createdAt]);
        }
        res[value.createdAt].hours += value.hours;
        return res;
      }, {});
      console.log(orderArray);
    } else if (dateFilter === "Monthly") {
      orderArray = [];
      const currentTime = new Date();
      const monthAway = new Date(Date.now() - 2.592e9);
      const monthlyDates = updatedOrders.filter(function(d) {
        const date = new Date(d.createdAt);
        return date <= currentTime && date >= monthAway;
      });
      monthlyDates.reduce(function(res, value) {
        if (!res[value.createdAt]) {
          res[value.createdAt] = { Date: value.createdAt, hours: 0 };
          orderArray.push(res[value.createdAt]);
        }
        res[value.createdAt].hours += value.hours;
        return res;
      }, {});
      console.log(orderArray);
    }
  });

  g.append("g")
    .attr("transform", `translate(10,${height - 50})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 0)
    .attr("dy", ".5em")
    .attr("transform", "rotate(0)")
    .style("text-anchor", "middle");

  g.append("g")
    .attr("transform", "translate(15,0)")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("dy", ".35em");

  d3.select("#lineGraph")
    .selectAll("circle")
    .data(orderArray)
    .join("circle")
    .attr("cx", function(d) {
      return x(d.Date) + 15;
    })
    .attr("cy", function(d) {
      return y(d.hours);
    })
    .attr("r", 5);

  const valueline = d3
    .line()
    .x(function(d) {
      return x(d.Date) + 15;
    })
    .y(function(d) {
      return y(d.hours);
    })
    .curve(d3.curveMonotoneX);

  d3.select("#lineGraph")
    .append("path")
    .data([orderArray])
    .attr("class", "line")
    .attr("stroke", "white")
    .attr("d", valueline);

  const tRows = d3
    .select("#orderTable tbody")
    .selectAll("tr")
    .data(orders)
    .join("tr")
    .attr("id", function(d, i) {
      return i;
    });

  tRows
    .selectAll("td")
    .data(function(d) {
      const allowed = [
        "repairOrderNumber",
        "vin",
        "yearMakeModel",
        "updatedAt",
        "createdAt",
        "name",
        "hours",
        "description",
        "id"
      ];
      const filtered = Object.keys(d)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = d[key];
          return obj;
        }, {});
      return Object.values(filtered);
    })
    .join("td")
    .attr("class", function() {
      return "row-data";
    })
    .text(d => d);

  tRows
    .selectAll("td.button")
    .data(d => [d])
    .join("td")
    .attr("class", "button")
    .append("button")
    .text(function() {
      return "Edit";
    })
    .attr("class", "edit-order")
    .on("click", function(event) {
      const rowId = event.target.parentNode.parentNode.id;
      const data = document.getElementById(rowId).querySelectorAll(".row-data");
      $("#editOrder").addClass("is-active");
      $("#idEdit").val(data[0].innerHTML);
      $("#repairOrderNumberEdit").val(data[1].innerHTML);
      $("#vinEdit").val(data[2].innerHTML);
      $("#yearMakeModelEdit").val(data[3].innerHTML);
      $("#nameEdit").val(data[4].innerHTML);
      $("#descriptionEdit").val(data[5].innerHTML);
      $("#hoursEdit").val(data[6].innerHTML);
    });
});
