const jwt = require("jsonwebtoken")

// validate token
function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Vårt token, tar bort bearer och mellanslag

    if(token == null) res.status(401).json({message:"Not authorized for this route - token missing"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
    if(error) return res.status(403).json({message:"invalid JWT"});

        req.username = username;
        next();


})

}


module.exports = authenticateToken; 