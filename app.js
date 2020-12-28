const express = require("express");
const app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "data_repository",
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

// Setting public direction
app.use(express.static(__dirname + "/public"));
// Set ejs template
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/node_modules/ckeditor"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/admin'));
app.use('/',require('./routes/student_module'))

app.get("/", (req, res) => {
  res.render("home");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;
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

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  connection.query("INSERT INTO Faculty SET ?", req.body, function (
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
      //   res.send({
      //     code: 200,
      //     success: "user registered sucessfully",
      //   });
      res.redirect("/login");
    }
  });
});


// Student Routes


// Faculty Routes
// Faculty Events Attended Page
app.get("/faculty/eventsAttended", (req, res) => {
  res.render("fields/fac_eventsAttended");
});

app.post("/faculty/eventsAttended", (req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO eventsAttended_fac SET ?", req.body, function (
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
      //   res.send({
      //     code: 200,
      //     success: "user registered sucessfully",
      //   });
      res.send({ code: 200, message: "Added successfully!" });
    }
  });
});



// Faculty Club Activities Page
app.get("/faculty/clubActivities", (req, res) => {
  res.render("fields/fac_clubActivities");
});

app.post("/faculty/clubActivities", (req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO clubActivities_fac SET ?", req.body, function (
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
      //   res.send({
      //     code: 200,
      //     success: "user registered sucessfully",
      //   });
      res.send({ code: 200, message: "Added successfully!" });
    }
  });
});

// Faculty Awards Page
app.get("/faculty/Awards", (req, res) => {
  res.render("fields/fac_awards");
});

app.post("/faculty/Awards", (req, res) => {
  console.log(req.body);
  connection.query("INSERT INTO Awards_fac SET ?", req.body, function (
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
      //   res.send({
      //     code: 200,
      //     success: "user registered sucessfully",
      //   });
      res.send({ code: 200, message: "Added successfully!" });
    }
  });
});

//Route for Report Generation
app.get("/faculty/search", (req, res) => {
  res.render('fac_search');
});

//Filter Data and Print
app.post("/faculty/search", (req, res) => {
  if(req.body.event=='all'){
    res.json({message: "All field is under development"})
    return;
  }
  let event  = req.body.event+"_fac";
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;
  let dept = req.body.dep.toUpperCase();
  let COE = req.body.COE;
  console.log(dept)
  console.log(req.body);
  let sql = `Select * from ${event} Where (filterDate BETWEEN ? AND ?)`;

  connection.query(sql,[fromDate,toDate],(err,result,fields)=>{
    if(err) throw err;
    console.log(result);
    let data = [];
    result.forEach((res,i)=>{
      if(res.department == null){
        res.department = "NULL"
      }
      if(req.body.details == "false"){
        delete res.description;
      }
      delete res.id;
      delete res.filterDate;
      if((((res.department == "NULL") || (dept=='ALL')  || (res.department == dept))&&((COE=='All') || (COE == res.COE)))){
        data.push(res);
      }
    })
    if(data.length == 0){
      res.json({error: "the data is empty based on your search results"});
      return;
    }
    res.render('fac_report', {
      title: 'Faculty Report',
      data: data
    });
  })
 

});

// Server Running at port 4000
app.listen("4000", () => {
  console.log("Server Started ... http://localhost:4000");
});
