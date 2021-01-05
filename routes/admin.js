const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../configs/admin-auth");

//Admin Panel
router.get("/admin", ensureAuthenticated, function (req, res) {
  res.render("admin/admin_panel", {
    title: "Dashboard",
  });
});

//Add User Page
router.get("/add-user", function (req, res) {
  res.render("admin/admin_addUser", {
    title: "Add User",
  });
});

//Login Page
router.get("/admin/login", function (req, res) {
  res.render("admin/admin_login");
});

//Login Handle
router.post("/admin/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user || user.role !== "admin") {
      req.flash("success_msg", "You do not have permission");
      return res.redirect("/admin/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/admin");
    });
  })(req, res, next);
});

//Logout Handle
router.get("/admin/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admin/login");
});

module.exports = router;
