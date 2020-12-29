const express = require('express');
const router = express.Router();

const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../configs/auth');


router.get("/", ensureAuthenticated, (req, res) => {
    res.render("home");
});


//Faculty Routes

router.get("/faculty/eventsAttended", ensureAuthenticated, (req, res) => {
    res.render("fields/fac_eventsAttended");
});

// Faculty Club Activities Page
router.get("/faculty/clubActivities", ensureAuthenticated, (req, res) => {
    res.render("fields/fac_clubActivities");
});

// Faculty Awards Page
router.get("/faculty/Awards", ensureAuthenticated, (req, res) => {
    res.render("fields/fac_awards");
});

//Route for Report Generation
router.get("/faculty/search", ensureAuthenticated, (req, res) => {
    res.render('fac_search');
});

//Student Routes

router.get("/students/eventsAttended", ensureAuthenticated, (req, res) => {
    res.render("fields/stu_eventsAttended");
});

router.get("/students/Awards", ensureAuthenticated, (req, res) => {
    res.render("fields/stu_awards");
});

router.get("/students/placement", ensureAuthenticated, (req, res) => {
    res.render("fields/stu_placement");
});


//Route for Report Generation
router.get("/students/search", ensureAuthenticated, (req, res) => {
    res.render('stu_search');
});


module.exports = router;