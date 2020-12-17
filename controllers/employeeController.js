const db = require("../models");

// Create all our routes and set up logic within those routes where required.

module.exports = function(app) {
  app.get("/api/user", (req, res) => {
    db.User.findAll({})(data => {
      const hbsObject = {
        employee: data
      };
      console.log(hbsObject);
      res.render("user", hbsObject);
    });
  });

  app.post("/api/user", (req, res) => {
    db.User.create(
      // NEED TO FILL IN, result => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId })
    );
  });

  app.put("/api/user/:id", (req, res) => {
    db.User.update(
      {
        //  Update the employee
      },
      condition,
      result => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
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
