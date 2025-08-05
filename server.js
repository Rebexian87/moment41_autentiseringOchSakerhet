/** */

const express = require("express");
const bodyParser = require ("body-parser");
const authRoutes =require("./routes/authRoutes")
const jwt = require("jsonwebtoken")
const cors = require ("cors")
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();


const port=process.env.PORT||3000;

//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


const router = express.Router();
const app = express();
app.use(bodyParser.json());

app.use(cors());

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


//Skapa ny flagga (POST)
app.post ("/api/flags", async (req, res) => {  //authenticateToken,
    try {const {country, colors} = req.body;
    // let country = req.body.country;
    // let colors = req.body.colors;
 

    //error handling, felhanterare som skapar felmeddelande

    let errors= {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!country|| !colors){
        errors.message = "Country and colors not included";
        errors.detail= "You must include colors and countrys in JSON"

        errors.https_response.message = "Bad Request";
        errors.https_response.code=400;

        return res.status(400).json(errors); }        
           

    //Lägg till flagga till databasen om inget har gått fel, man har med alla data som man ska ha

    const sql = `INSERT INTO flags (country, colors) VALUES(?,?)`;
        
        db.run (sql, [country, colors],  
        (error) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"});
                // return;
            } else {
            // console.log("Fråga skapad: " );
    

           let flag = {  
            country: country,
            colors: colors,
          
     
         }
     
     
         res.status(200).json({message: "Flag added"+flag}); //flag
    }})
        }catch {
            res.status(500).json ({error:"fel på flaggserver"})
        }
    });







        //Hämta alla flaggor (GET)
app.get ("/api/flags",async (req, res) => {  //authenticateToken,
    try {
    
     db.all("SELECT * FROM flags ORDER BY country;", (error,results)=> {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    // console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No flags found"})
    } else {
        res.json(results);
    }
    
})
   
}catch{
    res.status(500).json ({error:"fel på flaggserver"})
}
});




//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);    
})