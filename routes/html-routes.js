// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the employee page
    if (!req.user) {
      return res.render("login");
    }
    res.redirect("/member");
  });

  app.get("/signup", (req, res) => res.render("signup"));

  app.get("/login", (req, res) => {
    console.log("here");
    if (req.user) {
      res.redirect("/member");
    }
    res.render("login");
  });

  app.get("/member", isAuthenticated, (req, res) => {
    db.User.findByPk(req.user.id).then(async user => {
      let dataValues;
      if (req.user.clearance) {
        const employees = await db.User.findAll({
          where: { UserId: req.user.id },
          include: [{ model: db.Order }]
        });
        const fixed = JSON.parse(JSON.stringify(employees));
        console.log(fixed[0].Orders);

        const fixedWithCount = fixed.map(employee => {
          employee.total = 0;
          employee.Orders.map(order => {
            employee.total += order.hours;
          });
          return employee;
        });
        console.log(fixedWithCount);
        const myEmp = {
          userInfo: req.user,
          employees: fixed
        };
        // console.log(employees[1].Orders);
        res.render("manager", myEmp);
      } else if (dataValues === void 0) {
        const orders = await user.getOrders();
        const orderList = orders.map(order => {
          return order.dataValues;
        });
        const myObj = {
          userInfo: req.user,
          orders: orderList
        };
        res.render("employee", myObj);
      } else {
        res.render("employee");
      }
    });
  });

  // app.get("/api/user_data", isAuthenticated, (req, res) => {
  //   if (req.user.clearance) {
  //     res.render("manager");
  //   } else {
  //     res.render("employee");
  //   }
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/", isAuthenticated, (req, res) => {
    res.render("employee");
  });
};
