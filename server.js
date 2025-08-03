/** */

const express = require("express");
const bodyParser = require ("body-parser");
const authRoutes =require("./routes/authRoutes")
const jwt = require("jsonwebtoken")
const cors = require ("cors")
require("dotenv").config();

const port=process.env.PORT||3000;



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
app.post ("/api/flags", (req, res) => {
    let country = req.body.country;
    let colors = req.body.colors;
 

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

        res.status(400).json(errors);
        
        
        
        return;    
    
    }

    //Lägg till flagga till databasen om inget har gått fel, man har med alla data som man ska ha

    connection.query(`INSERT INTO flags (country, colors) VALUES (?,?);`, [country, colors], 
        (error, results) =>{
            if(error) {
                res.status(500).json({error: "Something went wrong"+error});
                return;
            }
            console.log("Fråga skapad: " + results);
    

           let flag = {  
            country: country,
            colors: colors,
          
     
         }
     
     
         res.json({message: "Flag added", flag});
        })


});

//Hämta alla flaggor (GET)
app.get ("/api/flags", (req, res) => {
   connection.query(`SELECT * FROM flags`, (error,results) => {
    if(error) {
        res.status(500).json({error: "Something went wrong"+error});
        return;
    }
    console.log(results);
    if(results.length ===0) {
        res.status(404).json({message: "No flags found"})
    } else {
        res.json(results);
    }
    
})
   
  
});



//Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);    
})