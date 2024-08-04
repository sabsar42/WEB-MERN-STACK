const jwt =require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token']
    jwt.verify(
        Token, "1234XYZ", function (err, decoded) {
            if (err) {
                res.status(401).json(
                    {

                        status: "Unauthorized",
                    }
                )
            }else{
                let email = decoded['data'];  // email tht was passed from UserController.login
                console.log(email);
                req.headers.email = email;   // place the email in header
                next();
            }
        }
    )
}