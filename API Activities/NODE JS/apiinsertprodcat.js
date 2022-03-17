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

console.log("mysql conc")
app.use(bodyParser.json())

app.post('/insertpd', (req, res) => {
    var pd = req.body.txtCategoryName;

    if (pd.length === 0) {
        res.send("Category name is empty")
        return;
    }
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("insert into productcategory (txtCategoryName) values (?)", pd,
        function (err, result, fields) {
            if (err) {
                if (err.errno == 1062)
                    res.send((view =
                    {
                        "status": "error",
                        "values": "Category already exists"
                    }));
                else res.send(err);
            }
            else {
                res.send((view = {
                    "status": "success",
                    "values": "Category created"
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

