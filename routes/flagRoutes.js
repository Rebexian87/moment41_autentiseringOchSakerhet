
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const authenticateToken=require("../middelware/authenticateToken.js")


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);





//Skapa ny flagga (POST)
router.post ("/flags", authenticateToken, async (req, res) => {  //authenticateToken,
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
     
     
         res.status(200).json({message: "Flag added",flag}); //flag
    }})
        }catch {
            res.status(500).json ({error:"fel på flaggserver"})
        }
    });







        //Hämta alla flaggor (GET)
router.get ("/flags",async (req, res) => {  //authenticateToken,
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



module.exports=router;