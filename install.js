require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Connect to database

const db = new sqlite3.Database(process.env.DATABASE);

// Create tables users

db.serialize(() => {
//Drop table 

// db.run("DROP TABLE IF EXISTS users");

db.run("DROP TABLE IF EXISTS flags");

//Create table, bra med id så man inte behöver använda användarnamnet när man pratar om sina användare
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);
console.log("Table created");

db.run(`CREATE TABLE flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country VARCHAR(255) NOT NULL UNIQUE,
    colors VARCHAR(255) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`
);


});
