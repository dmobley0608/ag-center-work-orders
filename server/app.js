const express = require('express')
const path = require("path");
require('dotenv').config();
const cors = require("cors")
const bodyParser = require('body-parser')
//Database
const mongoose = require('mongoose');
const  WorkOrder = require('./models/workOrderModel');
const workOrderRouter = require('./routes/workOrderRoutes');
mongoose.connect(`${process.env.DATABASE_CONNECTION_STRING}`) 

const app = express();
app.use(cors({
origin:'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


//Routes
app.use('/api/work-orders', workOrderRouter)

//Redirect to Frontend
app.use('/*', (req, res)=>{
    res.sendFile("index.html", {root: path.join(__dirname,"../build")})
})
app.listen(process.env.PORT || 9000, ()=>{ 
    console.log(`Running on Port: ${process.env.PORT || 9000}`)  
}) 