

const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();


//Connect to database
const db = new sqlite3.Database(process.env.DATABASE);


//Add new user, häruppe kanske man vill ha mer som email med mera
router.post("/register", async (req, res) => {
    try {
        const {username, password, email} = req.body

        //Validering
        if (!username || !password || !email) {
            return res.status(400).json({error: "username or password is incorrect, password needs to be ... etc"});            
        }
        // Does user already exists? Felmeddelande!!

        //Hash password

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //if correct save user
        const sql = `INSERT INTO users(username, password, email) VALUES(?,?,?)`
        db.run (sql, [username, hashedPassword, email], (error) => {
            if (error) {
                     res.status(400).json({error: "Fel när användare läggs till"});
            } else {
                   res.status(201).json({message: "User created"});
            }
        })
     

    } catch (error) {
        res.status(500).json( {error: "fel pa server"})
    }
    
});

//Login user , brukar bara vara två värden
router.post("/login", async (req, res) => {
    try {
          const {username, password} = req.body

        //Validering
        if (!username || !password) {
            return res.status(400).json({error: "username or password is incorrect, password needs to be ... etc"});            
        }

   
        //Check credentials

        //Check if user exists
        const sql = `SELECT * FROM users WHERE username=?`;
        db.get(sql, [username], async (error, row) => {
            if (error) {
                  res.status(400).json({message: "Error when autehent..."})
            }else if(!row) {
                 res.status(401).json({message: "Incorrect Username/Password!"})
            } else {

                //user exist--check username/password
                const passwordMatch = await bcrypt.compare(password, row.password);

                if(!passwordMatch) {
                      res.status(401).json({message: "Incorrect Username/Password!"})
                } else{

                    //Create JWT
                    const payload = {username:username};
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
                    const response = {
                        message: "User logged in!",
                        token: token
                    }
                    //Correct login
                    res.status(200).json({response});
                }

            }

        })


    } catch (error) {
        res.status(500).json( {error: "fel pa server"})
    }
    

    
});








module.exports=router;
