

const express = require("express");
const router = express.Router();

//Add new user, häruppe kanske man vill ha mer som email med mera
router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body

        //Validering
        if (!username || !password) {
            return res.status(400).json({error: "username or password is incorrect, password needs to be ... etc"});            
        }

        //if correct save user
        res.status(201).json({message: "User created"})

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

        //if correct check credentials

        if(username === "rebecca" && password === "rebecca") {
             res.status(200).json({message: "Login successful"})
        } else {
            res.status(401).json({error: "invalid username/password  /  credentials"})
        }

    } catch (error) {
        res.status(500).json( {error: "fel pa server"})
    }
    

    
});

module.exports=router;
