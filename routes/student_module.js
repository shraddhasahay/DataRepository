const express = require('express');
const router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_repository",
});

router.get("/students/eventsAttended", (req, res) => {
    res.render("fields/stu_eventsAttended");
});

router.post("/students/eventsAttended", (req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO eventsAttended SET ?", req.body, function (
        error,
        results,
        fields
    ) {
        if (error) {
            console.log(error);
        } else {
            console.log("Data Added Successfully!");
        }
    });
});


router.get("/students/Awards", (req, res) => {
    res.render("fields/stu_awards");
});

//Route for Report Generation
router.get("/students/search", (req, res) => {
    res.render('stu_search');
});

//Filter Data and Print
router.post("/students/search", (req, res) => {
    let event = req.body.event;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;
    let dept = req.body.dep.toUpperCase();
    let COE = req.body.COE;

    //All should  look for all the table in database
    if (req.body.event == 'all') {
        res.json({
            message: "All field is under development"
        })
        return;
    }
    let sql = `Select * from ${event} Where (filterDate BETWEEN ? AND ?)`;
    connection.query(sql, [fromDate, toDate], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        let data = [];
        result.forEach((res, i) => {
            if (res.department == null) {
                res.department = "NULL"
            }
            if (req.body.details == "false") {
                delete res.description;
            }
            delete res.id;
            delete res.filterDate;
            if ((((res.department == "NULL") || (dept == 'ALL') || (res.department == dept)) && ((COE == 'All') || (COE == res.COE)))) {
                data.push(res);
            }
        })
        if (data.length == 0) {
            res.json({
                error: "the data is empty based on your search results"
            });
            return;
        }
        res.render('stu_report', {
            title: 'Student Report',
            data: data
        });
    })

});

router.post("/students/Awards", (req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO Awards SET ?", req.body, function (
        error,
        results,
        fields
    ) {
        if (error) {
            console.log(error);
        } else {
            console.log("Data Added Successfully!");
        }
    });
});

router.get("/students/placement", (req, res) => {
    res.render("fields/stu_placement");
});

router.post("/students/placement", (req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO placement SET ?", req.body, function (
        error,
        results,
        fields
    ) {
        if (error) {
            console.log(error);
        } else {
            console.log("Data Added Successfully!");
        }
    });
});

module.exports = router;