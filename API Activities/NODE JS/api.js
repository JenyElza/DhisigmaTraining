
// Load the HTTP module
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server
const server = http.createServer()

// Instantiate Express, Body-Parser and Mysql
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql');

// Creating connection to Mysql 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});

//Connecting to the database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.json())

// To get details of all countries from the database
app.get('/getcountries', (req, res) => {
    con.query("select id, txtCountryName from country", function (err, result, fields) {
        res.send(view = {
            "status": "success",
            "values": result
        });
    });
});
