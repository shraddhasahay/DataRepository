const express = require('express')
const app = express();

app.get('/', (req,res)=>{
    res.send('Faculty Module');
})

app.listen('3000', ()=>{
    console.log('Server Started ...')
})