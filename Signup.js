import { Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style1.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";


function App() {
  const response = {
    status: "success",
    values: [],
  };

  const history = useHistory();
  const [statelist, setStateList] = useState([]);
  const [country, setcountry] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [add, setadd] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pin, setpin] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [street, setstreet] = useState('');

  const handleSelect = (e) => {
    console.log(e);
    setcountry(e);
  };




  const handleClick = () => {
    console.log("testing");
    let url = "https://ozfmcracrh.execute-api.ap-south-1.amazonaws.com/nodetest";
    axios
      .post(url, '{"task":"countryselect"}')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSignupClick = () => {
    console.log("testing");
    let url = "https://kfzvvp3yx1.execute-api.us-east-1.amazonaws.com/userinsert";
    let dd = '{"task":"userinsert","values":{"txtUsername":' + username + ',"txtPassword":' + password + ',"txtFirstName":' + fname + ',"txtLastName":' + lname + ',"refCountryName":' + country + ',"refStateName":' + state + ',"txtAddress":' + add + ',"txtStreet":' + street + ',"txtCity":' + city + ',"txtPincode":' + pin + ',"txtPhoneNo":' + phone + ',"txtWebsite":' + email + ',"bIsRegirtered":"1","dtCreatedOn":"2022-03-03","dtUpdatedOn":"2022-03-03","bDeleteFlag":"0"}}';
    axios
      .post(url, dd)
      .then((response) => {
        console.log(response);
        history.push("/Login")
      })
      .catch((error) => {
        console.log(error);
      });

  }


  const [countrylist, setcountrylist] = useState([]);
  useEffect(() => {

    let url = "https://ozfmcracrh.execute-api.ap-south-1.amazonaws.com/nodetest";
    axios
      .post(url, '{"task":"countryselect"}')
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //alert(response);
        console.log(response.data);
        setcountrylist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);



  const handleOnChange1 = (e) => {
    //alert(e.target.value);
    const index1 = e.target.selectedIndex;
    const optionElement1 = e.target.childNodes[index1];
    const optionElementId1 = optionElement1.getAttribute("id");
    state = optionElementId1;

  };

  const handleCountryChange = (e) => {

    // alert(e.target.value);
    const index = e.target.selectedIndex;
    const optionElement = e.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    country = optionElementId;
    alert(optionElementId);
    console.log(optionElementId);

    let url = "https://1c1qypjsqh.execute-api.ap-south-1.amazonaws.com/statelist";
    let dt = '{"task":"getstates","values":{"refCountryName":' + optionElementId + '}}';
    axios
      .post(url, dt)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // alert(response)
        setStateList(response.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <body>
      <div className="App" class="container">
        <div>
          <h1>Add Your Details</h1>
          <h4>Enter your details in the form below:</h4>
        </div>
        <form>
          <div>
            <label class="countryselect">Country/Region</label>
            <select class="form-control" id="sel1" onChange={handleCountryChange}>
              {countrylist.map((item) => {
                return <option id={item.id}>{item.txtCountryName}</option>
              })}
            </select>
          </div>
          <Row>
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input onChange={(e) => setusername(e.target.value)} value={username} type="text" class="form-control" id="inputUsername" placeholder="Username" />
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input onChange={(e) => setpassword(e.target.value)} value={password} type="text" class="form-control" id="inputPassword" placeholder="********" />
            </div>
          </Row>
          <Row>
            <div class="form-group col-md-6">
              <label as={Col}>FirstName</label>
              <input onChange={(e) => setfname(e.target.value)} type="text" class="form-control" value={fname} placeholder="Firstname"></input>
            </div>
            <div class="form-group col-md-6">
              <label as={Col}>Lastname</label>
              <input onChange={(e) => setlname(e.target.value)} type="text" class="form-control" value={lname} placeholder="Lastname"></input>
            </div>
          </Row>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input onChange={(e) => setadd(e.target.value)} type="text" class="form-control" value={add} placeholder="1234 Main St"></input><br></br>
          </div>

          <div class="form-row">
            <Row>
              <div class="form-group col-md-4">
                <label as={Col} for="inputCity">City</label>
                <input onChange={(e) => setcity(e.target.value)} type="text" class="form-control" value={city}></input>
              </div>
              <div class="form-group col-md-4">
                <label as={Col} for="inputState">State</label>
                <select class="form-control" id="sel2"  onChange={handleOnChange1}>
                  {statelist.map((item) => { return <option>{item.txtStateName}</option>; })}
                </select>
              </div>
              <div class="form-group">
                <label for="inputAddress">Street</label>
                <input
                  onChange={(e) => setstreet(e.target.value)} value={street} type="text" class="form-control" id="inputAddress2" placeholder="Street" />
              </div>
              <div class="form-group col-md-4">
                <label as={Col} for="inputZip">Pin Code</label>
                <input onChange={(e) => setpin(e.target.value)} type="text" class="form-control" value={pin}></input>
              </div>
            </Row>
          </div>

          <Row>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label as={Col} for="inputEmail4">Phone</label>
                <input onChange={(e) => setphone(e.target.value)} type="text" class="form-control" value={phone} placeholder="Phone"></input>
              </div>
              <div class="form-group col-md-6">
                <label as={Col} for="inputemail">Email</label>
                <input onChange={(e) => setemail(e.target.value)} type="text" class="form-control" value={email} placeholder="Email"></input>
              </div>
            </div>
          </Row>

          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck"></input>
              <label class="form-check-label" for="gridCheck">
                This store is a registered business
              </label>
            </div>
          </div>
          <div>
            <button onClick={handleSignupClick} type="submit" class="btn btn-primary">SignUp</button>
          </div>
          <Button type="submit" class="btn btn-light" onClick={handleClick}>
            Back
          </Button>
        </form>
      </div>
    </body>
  );
}

export default App;
