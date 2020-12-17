// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    if (!req.user) {
      res.render("login");
    } else if (req.user) {
      res.render("login");
    }
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.render("manager");
    } else {
      res.render("employee");
    }
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
  app.get("/employee", isAuthenticated, (req, res) => {
    res.render("signup");
  });
};
