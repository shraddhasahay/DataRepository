const express = require("express");
const router = express.Router();
const connection = require("../configs/DBConnection");

router.post("/faculty/eventsAttended", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO fac_eventsAttended SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        //   res.send({
        //     code: 200,
        //     success: "user registered sucessfully",
        //   });
        res.send({
          code: 200,
          message: "Added successfully!",
        });
      }
    }
  );
});

router.post("/faculty/clubActivities", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO fac_clubActivities SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          message: "Added successfully!",
        });
      }
    }
  );
});

router.post("/faculty/awards", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO fac_awards SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        //   res.send({
        //     code: 200,
        //     success: "user registered sucessfully",
        //   });
        res.send({
          code: 200,
          message: "Added successfully!",
        });
      }
    }
  );
});

//Filter Data and Print
router.post("/faculty/search", (req, res) => {
  if (req.body.event == "all") {
    res.json({
      message: "All field is under development",
    });
    return;
  }

  let event = "fac_" + req.body.event;
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;
  let dept = req.body.dep.toUpperCase();
  let COE = req.body.COE;
  console.log(dept);
  console.log(req.body);
  let sql = `Select * from ${event} Where (filterDate BETWEEN ? AND ?)`;

  connection.query(sql, [fromDate, toDate], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    let data = [];
    result.forEach((res, i) => {
      if (res.department == null) {
        res.department = "NULL";
      }
      if (req.body.details == "false") {
        delete res.description;
      }
      delete res.id;
      delete res.filterDate;
      if (
        (res.department == "NULL" || dept == "ALL" || res.department == dept) &&
        (COE == "All" || COE == res.COE)
      ) {
        data.push(res);
      }
    });
    if (data.length == 0) {
      res.json({
        error: "the data is empty based on your search results",
      });
      return;
    }
    res.render("fac_report", {
      title: "Faculty Report",
      data: data,
    });
  });
});

module.exports = router;
