/** */

const express = require("express");
const bodyParser = require ("body-parser");
const authRoutes =require("./routes/authRoutes")
const flagRoutes =require("./routes/flagRoutes")
const jwt = require("jsonwebtoken")
const cors = require ("cors")
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const authenticateToken=require("./middelware/authenticateToken.js")


const port=process.env.PORT||3000;

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


const router = express.Router();
const app = express();
app.use(bodyParser.json());

app.use(cors());

//Routes
app.use("/api", authRoutes);

app.use("/api", flagRoutes) 

//Protected route
app.get("/api/protected", authenticateToken, (req,res) => {
    res.json({message: "protected route"});
});










//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);    
})