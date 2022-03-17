// Created by Jeny Biju

// Load the HTTP module. Created on 7th March 2022
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server. Created on 7th March 2022
const server = http.createServer()

// Instantiate Express, Body-Parser and Mysql. Created on 7th March 2022
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql');

// Creating connection to Mysql. Created on 7th March 2022 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});


//Connecting to the database. Created on 7th March 2022
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

app.use(bodyParser.json())

// To get details of all countries from the database. Created on 8th March 2022
app.get('/countrylist', (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var task = req.body.task;
    con.query("select id, txtCountryName from country", function (err, result, fields) {
        res.send(view = {
            "status": "success",
            "values": result
        });
    });
    con.end(function (err) {
        console.log("Disconnected!")
        // all connections in the pool have ended
    });
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
