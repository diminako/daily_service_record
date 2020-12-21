// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    return res.sendStatus(200);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      clearance: true
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/order", (req, res) => {
    if (req.user) {
      db.Order.create({
        repairOrderNumber: req.body.repairOrderNumber,
        vin: req.body.vin,
        yearMakeModel: req.body.yearMakeModel,
        name: req.body.name,
        description: req.body.description,
        hours: req.body.hours,
        UserId: req.user.id
      }).then(() => {
        return res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });

  // PUT route for updating order
  app.put("/api/order", function(req, res) {
    console.log(req.body);
    db.Order.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.post("/api/employee/create", (req, res) => {
    res.sendStatus(200);
  });

  app.put("/api/employee/update", (req, res) => {
    // DO NOT UPDATE THE PASSWORD OR ID
    res.sendStatus(200);
  });

  //  read information for orders
  app.get("/api/user_orders", (req, res) => {
    if (req.user) {
      const userId = req.user.id;
      db.Order.findAll({
        where: {
          UserId: userId
        }
      }).then(results => res.json(results));
    } else {
      res.sendStatus(403);
    }
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //Route for creating new employee
  app.post("/api/user_employee", (req, res) => {
    db.User.create({
      UserId: req.user.id,
      email: req.body.email,
      password: req.body.password,
      clearance: false
    }).then(() => res.sendStatus(200));
  });

  app.get("/api/user_employees", (req, res) => {
    db.User.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(() => res.sendStatus(200));
  });

  // // Route for getting all employee stats - Not working.
  // app.get("/api/user_employee_stats", function(req, res) {
  //   db.User.findAll({
  //     where: {
  //       managerID: req.params.id
  //     }
  //   }).then(function(data) {
  //     res.json(data);
  //   });
  // });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // CHANGE WHERE THEY RENDER
  app.get("/api/user_data", isAuthenticated, (req, res) => {
    if (req.user.clearance) {
      res.render("manager");
    } else {
      res.render("employee");
    }
  });
};
