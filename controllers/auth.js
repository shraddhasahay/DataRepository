const connection = require('../configs/DBConnection');

exports.login = (req, res) => {
    const {
        mailid,
        password
    } = req.body;

    let errors = [];
    if (!mailid || !password) {
        errors.push({
            msg: 'Please fill in all fields'
        });
    }

    if (errors.length > 0) {
        res.render('login', {
            errors: errors
        });
    }
}

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
    //validating email id
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
    connection.query('SELECT mailid FROM faculty WHERE mailid = ?', [mailid], (error, data)=>{
        if(error){
            console.log('Email id coud not be found')
        }
        if(data.length>0){
            errors.push({
            msg: 'Email already exist'

        })
   }
    if (errors.length > 0) {
        res.render('admin/admin_addUser', {
            errors: errors,
            title: 'Add User'

        });

    }
      else {
           connection.query('INSERT INTO faculty SET ? ',{name:name , mailid:mailid , password:password, id: id}, (data)=> {
       
        {
                res.render('admin/admin_addUser',{
                success_msg: 'User registered successfully',
                title: 'Add User'
            });
        }
    })
    }
})
}