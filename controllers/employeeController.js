const express = require("express");

const router = express.Router();

const employee = require("../models/employee.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  employee.all(data => {
    const hbsObject = {
      employee: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/employee", (req, res) => {
  employee.create(
    // NEED TO FILL IN, result => {
    // Send back the ID of the new quote
    res.json({ id: result.insertId })
  );
});

router.put("/api/employee/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  employee.update(
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

// Export routes for server.js to use.
module.exports = router;
