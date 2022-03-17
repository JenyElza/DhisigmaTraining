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
const { nextTick } = require('process');

// Creating connection to Mysql. Created on 7th March 2022 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerceweb"
});


app.use(bodyParser.json())

app.post('/putuser', (req, res) => {
    var name = req.body.txtUsername;
    var pass = req.body.txtPassword;
    var fname = req.body.txtFirstName;
    var lname = req.body.txtLastName;
    var country = req.body.refCountry;
    var state = req.body.refState;
    var address = req.body.txtAddress;
    var street = req.body.txtStreet;
    var city = req.body.txtCity;
    var pin = req.body.txtPinCode;
    var phone = req.body.txtPhoneno;
    var web = req.body.txtWebsite;
    var utype = req.body.refUserType;
    
    console.log(name);
    
    if (name.length == 0) {
        res.send("username is empty")
        return;
    }
    if (pass.length == 0) {
        res.send("password is empty")
        return;
    }
    if (fname.length == 0) {
        res.send("firstname is empty")
        return;
    }
    if (lname.length == 0) {
        res.send("lastname is empty")
        return;
    }
    if (country.length == 0) {
        res.send("country is empty")
        return;
    }
    if (state.length == 0) {
        res.send("state is empty")
        return;
    }
    if (address.length == 0) {
        res.send("address is empty")
        return;
    }
    if (street.length == 0) {
        res.send("street is empty")
        return;
    }
    if (city.length == 0) {
        res.send("city is empty")
        return;
    }
    if (pin.length == 0) {
        res.send("pincode is empty")
        return;
    }
    if (phone.length == 0) {
        res.send("phone is empty")
        return;
    }
    if (web.length == 0) {
        res.send("website is empty")
        return;
    }
    if (utype.length == 0) {
        res.send("Type is empty")
        return;
    }

    console.log(state)
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    con.query("insert into users (txtUsername,txtPassword,txtFirstName,txtLastName,refUserType,refCountry,refState,txtAddress,txtStreet,txtCity,txtPinCode,txtPhoneno,txtWebsite) values (?,?,?,?,?,?,?,?,?,?,?,?,?);",[name,pass,fname,lname,utype,country,state,address,street,city,pin,phone,web],
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





