const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../configs/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("home", {
    Username: req.user.name,
  });
});

//Faculty Routes

router.get("/faculty/eventsAttended", ensureAuthenticated, (req, res) => {
  res.render("fields/fac_eventsAttended", {
    title: "Events",
    module: "Faculty",
    Username: req.user.name,
  });
});

// Faculty Club Activities Page
router.get("/faculty/clubActivities", ensureAuthenticated, (req, res) => {
  res.render("fields/fac_clubActivities", {
    title: "Club",
    module: "Faculty",
    Username: req.user.name,
  });
});

// Faculty Awards Page
router.get("/faculty/awards", ensureAuthenticated, (req, res) => {
  res.render("fields/fac_awards", {
    title: "Awards",
    module: "Faculty",
    Username: req.user.name,
  });
});

//Route for Report Generation

router.get("/faculty/search", ensureAuthenticated, (req, res) => {
  res.render("fac_search", {
    title: "",
    module: "Faculty",
    Username: req.user.name,
  });
});

//Student Routes

router.get("/students/eventsAttended", ensureAuthenticated, (req, res) => {
  res.render("fields/stu_eventsAttended", {
    title: "Events",
    module: "Student",
    Username: req.user.name,
  });
});

router.get("/students/awards", ensureAuthenticated, (req, res) => {
  res.render("fields/stu_awards", {
    title: "Awards",
    module: "Student",
    Username: req.user.name,
  });
});

router.get("/students/placement", ensureAuthenticated, (req, res) => {
  res.render("fields/stu_placement", {
    title: "Placement",
    module: "Student",
  });
});

//Route for Report Generation
router.get("/students/search", ensureAuthenticated, (req, res) => {
  res.render("stu_search", {
    module: "Student",
    title: "",
    Username: req.user.name,
  });
});

module.exports = router;
