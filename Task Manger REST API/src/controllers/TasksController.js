const TasksModel = require("../models/TasksModel");


exports.createTask=(req,res)=>{
    let reqBody=req.body
    reqBody.email=req.headers['email'];
    TasksModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(200).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

exports.updateTask = (req,res)=>{
    let reqBody = req.body;
    reqBody.email = req.headers['email'];
    TaskModel.update(reqBody,(err,data)=>{
        if(err){
            res.status(200).json({
                status:"fail", data:err
            })
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}