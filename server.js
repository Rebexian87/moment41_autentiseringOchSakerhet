/** */

const express = require("express");
const bodyParser = require ("body-parser");
const authRoutes =require("./routes/authRoutes")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const port=process.env.PORT||3000;

const app = express();
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Protected route
app.get("/api/protected", authenticateToken, (req,res) => {
    res.json({message: "protected route"});
});

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

//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);    
})