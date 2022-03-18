import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style1.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import Home from "./Home";
import { ReactSession } from 'react-client-session';


const Login = () => {

    const headers =  {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }


    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const history = useHistory();

    ReactSession.set("username", username);
    

    const handleLoginClick = () => {
        
        const testdata = ReactSession.get("username");
        console.log(testdata);
        
        console.log("testing");
        console.log(username);
        console.log(password);        
        let url = "https://siyde5fve3.execute-api.ap-south-1.amazonaws.com/uservalidation";
        let dd = '{"task":"getuser","txtUsername":"' + username + '","txtPassword":"' + password + '"}';


        console.log(dd);

        axios
          .post(url, dd ,headers)
          .then((response) => {
            console.log(response);
             //history.push("/Home")
          })
          .catch((error) => {
            console.log(error.response.data);
          });

        

    }


    return (
        <div>  
            <div as={Row} class="form-group col-md-6">
            <label>Username</label>
            <input onChange={(e) => setusername(e.target.value)} value={username} type="text" class="form-control" id="userename" placeholder="Enter username"></input>
            </div>
            <div as={Row} class="form-group col-md-6">
                <label >Password</label>
                <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" class="form-control" id="password" placeholder="Enter Password"></input>
            </div><br></br>
            <div></div>
            <button onClick={handleLoginClick} type="submit" class="btn btn-primary">Login</button>
            </div>
            
        
    )
}

export default Login;