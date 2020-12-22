const express = require('express');
const router = express.Router();


//Admin Panel
router.get('/admin', function (req, res){
    res.render('admin_panel');
});

module.exports = router;