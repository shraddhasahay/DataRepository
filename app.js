const express = require("express");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const connection = require('./configs/DBConnection');

// Setting public direction
app.use(express.static(__dirname + "/public"));
// Set ejs template
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/node_modules/ckeditor"));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Express Session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));


//Connect Flash

app.use(flash());

//Global Vars

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/student_module'));
app.use('/', require('./routes/faculty_module'));



app.get("/", (req, res) => {
  res.render("home");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const {
    id,
    password
  } = req.body;
  console.log(id, password);

  connection.query("SELECT * FROM Faculty WHERE id = ?", [id], function (
    error,
    results,
    fields
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred",
      });
    } else {
      if (results.length > 0) {
        const comparision = password === results[0].password;
        if (comparision) {
          res.send({
            code: 200,
            success: "login sucessfull",
          });
        } else {
          res.send({
            code: 204,
            success: "Id and password does not match",
          });
        }
      } else {
        res.send({
          code: 206,
          success: "Id does not exits",
        });
      }
    }
  });
});

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// // app.post("/register", (req, res) => {
// //   connection.query("INSERT INTO Faculty SET ?", req.body, function (
// //     error,
// //     results,
// //     fields
// //   ) {
// //     if (error) {
// //       res.send({
// //         code: 400,
// //         failed: "error ocurred",
// //       });
// //     } else {
// //       //   res.send({
// //       //     code: 200,
// //       //     success: "user registered sucessfully",
// //       //   });
// //       res.redirect("/login");
// //     }
// //   });
// // });


// Server Running at port 4000
app.listen("4000", () => {
  console.log("Server Started ... http://localhost:4000");
});