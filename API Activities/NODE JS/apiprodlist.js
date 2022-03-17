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



app.get('/getproductlist', (req, res) => {
 
 
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("select p.id,p.txtProdName,p.txtProdPrice,c.txtCategoryName from product p join productcategory c on p.refProdCategory=c.id;", 
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
