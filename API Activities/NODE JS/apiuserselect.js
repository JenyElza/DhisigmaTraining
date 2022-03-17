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

// To get user details by id.
app.get('/getuser', (req, res) => {
    var uid = req.body.id;
    
    if (uid == 0) {
        res.send("Id not specified")
        return;
    }
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("select u.id, u.txtUsername, u.txtPassword, u.txtFirstName, u.txtLastName, u.txtPhoneNo, u.txtWebsite, t.txtUserType from users u join usertype t on u.refUserType=t.id where u.id=?;", uid,
        function (err, result, fields) {
            
            if (err) 
            {   
                    res.send((view =
                    {
                       "status": "error",
                       "values": "No user in given ID"
                   }));
                
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
