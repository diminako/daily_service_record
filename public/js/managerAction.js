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

const test = async () => {
  const myUsers = await $.get("/api/myEmployees");

  const width = d3
    .select("#lineGraph")
    .node()
    .getBoundingClientRect().width;
  const height = d3
    .select("#lineGraph")
    .node()
    .getBoundingClientRect().height;

  const x = d3.scaleBand().rangeRound([0, width - 50]);
  x.domain(
    myUsers.employees.map(function(d) {
      return d.email;
    })
  );
  const y = d3.scaleLinear().range([height - 50, 10]);
  y.domain([
    0,
    d3.max(myUsers.employees, function(d) {
      return d.total;
    })
  ]);
  const g = d3.select("#lineGraph").append("g");
  g.append("g")
    .attr("class", "xaxis")
    .attr("transform", `translate(10,${height - 50})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 0)
    .attr("dy", ".5em")
    .attr("transform", "rotate(0)")
    .style("text-anchor", "middle");

  g.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(25,0)")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("dx", ".25em");

  d3.select("#lineGraph")
    .selectAll("circle")
    .data(myUsers.employees)
    .join("circle")
    .attr("cx", function(d) {
      return x(d.email) + 100;
    })
    .attr("cy", function(d) {
      return y(d.total);
    })
    .attr("class", "circle")
    .attr("r", 5)
    .attr("fill", "orange");

  const valueline = d3
    .line()
    .x(function(d) {
      return x(d.email) + 100;
    })
    .y(function(d) {
      return y(d.total);
    })
    .curve(d3.curveMonotoneX);

  const line = d3
    .select("#lineGraph")
    .append("path")
    .data([myUsers.employees])
    .attr("class", "line")
    .attr("stroke", "white")
    .attr("fill", "none")
    .attr("d", valueline);
};
test();
