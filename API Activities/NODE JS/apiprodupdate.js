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

app.post('/putproduct', (req, res) => {
    var pid = req.body.id;
    var pprice = req.body.txtProdPrice;
    var pname = req.body.txtProdName;
    var pcat = req.body.refProdCategory;
    
    if (pid.length === 0) {
        res.send("ID is empty")
        return;
    }
    if (pprice.length === 0) {
        res.send("Productprice is empty")
        return;
    }
    if (pname.length === 0) {
        res.send("Productname is empty")
        return;
    }
    if (pcat.length === 0) {
        res.send("Productcategory is empty")
        return;
    }
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("update product set txtProdName=?, txtProdPrice=? ,refProdCategory=? where id=?", [pname,pprice,pcat,pid],
        function (err, result, fields) {
            if (err) {
                if (err.errno == 1012)
                    res.send((view =
                    {
                        "status": "error",
                        "values": "Record doesnot exist"
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
