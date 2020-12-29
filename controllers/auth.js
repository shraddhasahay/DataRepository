const connection = require('../configs/DBConnection');

exports.register = (req, res) => {
    const {
        id,
        name,
        mailid,
        password,
        password2,
        joiningDate,
        department
    } = req.body;
    // validate required fields
    let errors = [];


    //Check Required Fields
    if (!name || !mailid || !password || !password2 || !id) {
        errors.push({
            msg: 'Please fill in all fields'
        });
    }
    //Check Passwords match
    if (password !== password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }

    if (errors.length > 0) {
        res.render('admin/admin_addUser', {
            errors: errors,
            title: 'Add User'

        });
    } else {
        res.render('admin/admin_addUser', {
            success_msg: "User have been added to the database!",
            title: 'Add User'
        });

    }

}