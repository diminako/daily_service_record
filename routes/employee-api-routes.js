const db = require("../models");

module.exports = function(app) {
  app.get("/api/employees", (req, res) => {
    //  find all objects
    db.Employees.findAll({}).then(result => {
      return res.json(result);
    });
  });

  app.get("/api/employees/:repairOrderNumber", (req, res) => {
    //   find Repair Order by repair order number
    db.Employees.findOne({
      where: {
        repairOrderNumber: req.body.repairOrderNumber
      }
    }).then(result => {
      return res.json(result);
    });
  });

  app.get("/api/employees/:createdAt", (req, res) => {
    //   find Repair Order by date it was created at
    db.Employees.findAll({
      where: {
        createdAt: req.body.createdAt
      }
    }).then(result => {
      return res.json(result);
    });
  });
};
