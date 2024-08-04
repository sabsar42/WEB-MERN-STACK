const express = require('express');
const router = require('./src/routes/api');
const app = new express()
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');
const limiter = rateLimit({windowMs:15*60*1000, max:3000})

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(limiter)
app.use("/apu/v1",router)
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})


let URI = "mongodb://localhost:27017/"
let OPTION ={user:'admin', pass:'1234',autoIndex:true}
mongoose.connect(URI,OPTION)


module.exports = app;



