const db = require("../models");

// Create all our routes and set up logic within those routes where required.

module.exports = function(app) {
  app.get("/api/manager", (req, res) => {
    db.User.findAll({})(data => {
      const hbsObject = {
        employee: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.post("/api/manager", (req, res) => {
    db.User.create(
      // NEED TO FILL IN, result => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId })
    );
  });
};

// const db = require("../models");

// module.exports = function(app) {
//   app.get("/api/employees", (req, res) => {
//     //  find all objects
//     db.Employees.findAll({}).then(result => {
//       return res.json(result);
//     });
//   });

//   app.get("/api/employees/:repairOrderNumber", (req, res) => {
//     //   find Repair Order by repair order number
//     db.Employees.findOne({
//       where: {
//         repairOrderNumber: req.body.repairOrderNumber
//       }
//     }).then(result => {
//       return res.json(result);
//     });
//   });

//   app.get("/api/employees/:createdAt", (req, res) => {
//     //   find Repair Order by date it was created at
//     db.Employees.findAll({
//       where: {
//         createdAt: req.body.createdAt
//       }
//     }).then(result => {
//       return res.json(result);
//     });
//   });
// };
