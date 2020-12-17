// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/employee", (req, res) => {
    // If the user already has an account send them to the employee page
    if (req.user) {
      res.redirect("/employee");
    }
    res.render("employee");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/employee", isAuthenticated, (req, res) => {
    res.render("");
  });
};
