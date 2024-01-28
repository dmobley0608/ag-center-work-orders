const express = require('express')
const path = require("path");
require('dotenv').config();
const cors = require("cors")
const {passport} = require('./utils/auth');
const session = require('express-session')
const MongoStore = require('connect-mongo');
//Models
const  WorkOrder = require('./models/workOrderModel');
//Routers
const workOrderRouter = require('./routes/workOrderRoutes');
const inventoryRouter = require('./routes/inventoryRoutes')
const userRouter = require('./routes/userRoutes');
//Database
const mongoose = require('mongoose');

mongoose.connect(`${process.env.DATABASE_CONNECTION_STRING}`)    

//App Config
const app = express();
app.use(cors({
origin:'*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//Session Management

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://dmobley0608:thebigdawgisawesome@ag-center.0pcnlbi.mongodb.net/?retryWrites=true&w=majority',
        ttl:86400000,
        autoRemove:'native'    
    }),   
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,    
    sameSite:"none",
    cookie: {
        maxAge: 86400000,
        secure: false,  
        httpOnly:true     
    }
    
}))  
app.use(passport.initialize())
app.use(passport.authenticate('session')) 

//Routes

app.use('/api/work-orders', workOrderRouter)
app.use('/api/user', userRouter)
app.use('/api/inventory', inventoryRouter)

//Redirect to Frontend
app.use('/*', (req, res)=>{
    req.method = 'get'
    res.sendFile("index.html", {root: path.join(__dirname,"../build")})
})
app.listen(process.env.PORT || 9000, ()=>{ 
    console.log(`Running on Port: ${process.env.PORT || 9000}`)  
}) 