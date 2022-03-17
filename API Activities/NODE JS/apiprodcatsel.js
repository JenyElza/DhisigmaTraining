// Created by Jeny Biju

// Load the HTTP module. 
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server. 
const server = http.createServer()

// Instantiate Express, Body-Parser and Mysql. 
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql');
const { pid } = require('process');


// Creating connection to Mysql. 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});


app.use(bodyParser.json())

app.get('/getcategorylist', (req, res) => {
    var pid = req.body.id;
 
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("select id,txtCategoryName from productcategory where id=?;",id, 
        function (err, result, fields) {
            
            if (err) 
            {    res.send(err);
                }
            else {
                res.send((view = {
                    "status": "success",
                    "values": result
                })
                );
            }

        });
        con.end();
        console.log("Disconnected")
    })

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})