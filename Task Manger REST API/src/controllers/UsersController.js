const UsersModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require('../models/SendEmailUtility');


exports.registration = async (req, res) => {
    let reqBody = req.body;
    try {

        let result = await UsersModel.create(reqBody);
        res.status(200).json({status: "success", data: result});
    } catch (e) {
        res.status(200).json({status: "fail", data: e});

    }

}


exports.login = async (req, res) => {
   try {
       let reqBody = req.body;
       let result = await UsersModel.find(reqBody).count();
       if (result === 1) {

           //Create Token
           let Payload = {
               exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
               data: req.body['email']
           }

           let token = jwt.sign(Payload, "1234XYZ ")  // Secret Key to Verify Token
           res.status(200).json({
               status: "success",
               data: reqBody['email'],
               token: token
           });


       } else {
           res.status(200).json({
               status: "failed",
               data: "No user Found"
           });
       }

   }catch (e) {
       res.status(200).json(
           {
               status: "failed",
               data: e
           }
       )
   }

}


exports.profileUpdate = async (req, res) => {
    let email = req.headers['email']
    let reqBody = req.body;
}


exports.profileDetails = async (req, res) => {
    let email = req.headers['email']
}

exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900)
}


exports.RecoverVerifyOTP = async (req, res) => {
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;

}

exports.RecoverResetPass = async (req, res) => {
    let email = req.body['email']
    let OTPCode = req.body['OTP']
    let NewPass = req.body['password']
    let statusUpdate = 1;

}

