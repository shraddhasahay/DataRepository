const express = require('express')
const app = express();

// Setting public direction
app.use(express.static(__dirname + "/public"));
// Set ejs template
app.set("view engine", "ejs");

// Routes
app.get('/', (req,res)=>{
    res.send('Faculty Module');
})

// Login Page
app.get('/login', (req,res)=>{
    res.render('login');
})

// Server Running at port 3000
app.listen('3000', ()=>{
    console.log('Server Started ...')
})