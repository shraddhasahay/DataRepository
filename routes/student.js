const express = require("express");
const router = express.Router();
const connection = require("../configs/DBConnection");

router.post("/students/eventsAttended", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO stu_eventsAttended SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Data Added Successfully!");
      }
    }
  );
});

//Filter Data and Print
router.post("/students/search", (req, res) => {
  let event = "stu_" + req.body.event;
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;
  let dept = req.body.dep.toUpperCase();
  let COE = req.body.COE;

  //All should  look for all the table in database
  if (req.body.event == "all") {
    res.json({
      message: "All field is under development",
    });
    return;
  }
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
    res.render("stu_report", {
      title: "Student Report",
      data: data,
    });
  });
});

router.post("/students/awards", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO stu_awards SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Data Added Successfully!");
      }
    }
  );
});

router.post("/students/placement", (req, res) => {
  console.log(req.body);
  connection.query(
    "INSERT INTO stu_placement SET ?",
    req.body,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Data Added Successfully!");
      }
    }
  );
});

module.exports = router;
