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
const { pid } = require('process');


// Creating connection to Mysql. Created on 7th March 2022 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});


app.use(bodyParser.json())

app.get('/getproduct', (req, res) => {
    var pid = req.body.productid;
    console.log(pid)
    if (pid == 0) {
        res.send("Id not specified")
        return;
    }
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("select id, txtProdName, txtProdPrice, refProdCategory from product where id=?", pid,
        function (err, result, fields) {
            
            if (err) 
            {   if (err.errno==404)
                    res.send((view =
                    {
                       "status": "error",
                       "values": "No product by given ID"
                   }));
                else res.send(err);
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

