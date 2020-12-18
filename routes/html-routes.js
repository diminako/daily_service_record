// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

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
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/member");
    }
    res.render("login");
  });

  app.get("/member", isAuthenticated, (req, res) => {
    if (req.user.clearance) {
      res.render("manager");
    } else {
      res.render("employee");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/", isAuthenticated, (req, res) => {
    res.render("employee");
  });
};
