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

app.post('/putuser', (req, res) => {
    var uid = req.body.id;
    var uname = req.body.txtUsername;
    var upass = req.body.txtPassword;
    var fname = req.body.txtFirstName;
    var lname = req.body.txtLastName;
    var pno = req.body.txtPhoneNo;
    var web = req.body.txtWebsite;
    
    if (uid.length === 0) {
        res.send("ID is empty")
        return;
    }
    if (uname.length === 0) {
        res.send("Username is empty")
        return;
    }
    if (upass.length === 0) {
        res.send("Password is empty")
        return;
    }
    if (fname.length === 0) {
        res.send("Firstname is empty")
        return;
    }
    if (lname.length === 0) {
        res.send("Lastname is empty")
        return;
    }
    if (pno.length === 0) {
        res.send("Phoneno is empty")
        return;
    }
    if (web.length === 0) {
        res.send("Website is empty")
        return;
    }
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    con.query("update users set txtUsername=?,txtPassword=?,txtFirstName=?,txtLastName=?,txtPhoneNo=?,txtWebsite=? where id=?;", [uname,upass,fname,lname,pno,web,uid],
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