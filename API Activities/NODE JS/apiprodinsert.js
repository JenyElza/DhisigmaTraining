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
const { nextTick } = require('process');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});

app.use(bodyParser.json())

app.post('/putproduct', (req, res) => {
    var name = req.body.txtProdName;
    var price = req.body.txtProdPrice;
    var pcat = req.body.refProdCategory;
    
    console.log(name);

    if (name.length == 0) {
        res.send("name is empty")
        return;
    }
    if (price.length == 0) {
        res.send("price is empty")
        return;
    }
    if (pcat.length == 0) {
        res.send("category is empty")
        return;
    }

    console.log(price)
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    con.query("insert into product (txtProdName,txtProdPrice,refProdCategory) values (?,?,?);",[name,price,pcat],
        function (err, result, fields) {
            if (err) {
                if(err.errno==1064)
                {
                    res.send((view = {
                        "status": "error",
                        "values": "user already exists"
                    }));
                }
                else res.send(err);
            } 
            else {
                res.send((view = {
                    "status": "success",
                    "values": result
                }));
            }
        }
    );
    con.end();
    console.log("Disconnected")
    });


    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });