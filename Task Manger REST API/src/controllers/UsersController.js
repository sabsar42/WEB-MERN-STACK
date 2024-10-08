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

    } catch (e) {
        res.status(200).json(
            {
                status: "failed",
                data: e
            }
        )
    }

}


exports.profileUpdate = async (req, res) => {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        let result = await UsersModel.updateOne({
            email: email
        }, reqBody);
        res.status(200).json({
            status: "success",
            data: result,


        });
    } catch (e) {
        res.status(200).json(
            {
                status: "failed",
                data: e
            }
        )
    }

}


exports.profileDetails = async (req, res) => {
    try {
        let email = req.headers['email'];
        let result = await UsersModel.find({
            email: email
        });
        res.status(200).json({
            status: "success",
            data: result

        });
    } catch (e) {
        res.status(200).json(
            {
                status: "failed",
                data: e
            }
        )
    }

}

exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900);
    let EmailText ="Your Verification code is"+OTPCode;
    let EmailSubject = "Task Manager Verification Code"
    let result = await UsersModel.find({
        email: email
    });

    if (result === 1) {

        await SendEmailUtility(
           email, EmailText, EmailSubject
        );

      let result =  await OTPModel.create(
            {
                email:email,
                otp: OTPCode,
            }
        )

        res.status(200).json({
            status: "success",
            data: "OTP Digit has been sent"

        });


    } else {
        res.status(200).json(
            {
                status: "failed",
                data: e
            }
        )
    }

}


exports.RecoverVerifyOTP = async (req, res) => {
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;

    let result = await  OTPModel.find(
        {
            email:email, otp:OTPCode, status:status
        }
    ).count();

    if(result===1){
        await OTPModel.updateOne({
            email:email, otp:OTPCode, status:status
        },
            {
                status:statusUpdate
            }
        )
        res.status(200).json({
            status:"success", data: "Verfiication Completed"
        })

    }else{
        res.status(200).json({
            status:"fail", data: "Verfiication Failed"
        })
    }

}



exports.RecoverResetPass = async (req, res) => {
    let email = req.body['email']
    let OTPCode = req.body['OTP']
    let NewPass = req.body['password']
    let statusUpdate = 1;
    let result = await  OTPModel.find(
        {
            email:email, otp:OTPCode, status:statusUpdate
        }
    ).count();

    if(result===1){
        let result = await UsersModel.updateOne({
            email: email,
            password:NewPass,
        }, );

        res.status(200).json({
            status:"success", data: "Password Reset Successfull"
        })
    }else{
        res.status(200).json({
            status:"fail", data: "Password Reset Failed"
        })
    }
}

