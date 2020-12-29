const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../configs/admin-auth');

//Admin Panel
router.get('/admin', ensureAuthenticated, function (req, res) {
    res.render('admin/admin_panel', {
        title: 'Dashboard'
    });
});

//Add User Page
router.get('/add-user', function (req, res) {
    res.render('admin/admin_addUser', {
        title: 'Add User'
    });
});


//Login Page
router.get('/admin/login', function (req, res) {
    res.render('admin/admin_login');
});

//Login Handle
router.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);

});

//Logout Handle
router.get('/admin/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/admin/login');
})

module.exports = router;