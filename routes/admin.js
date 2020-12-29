const express = require('express');
const router = express.Router();


//Admin Panel
router.get('/admin', function (req, res) {
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
router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;