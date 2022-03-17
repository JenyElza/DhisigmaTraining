var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-1.cq6avrntdh5x.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "jenysdatabase",
    database: "ecommerceweb"
}); 


exports.handler = (event, context, callback) =>{
    var data = JSON.parse(event.body);
	
	var uid = data.id;
	var name = data.txtUsername;
    var pass = data.txtPassword;
	var fname = data.txtFirstName;
    var lname = data.txtLastName;
	var phone = data.txtPhoneNo;
    var web = data.txtWebsite;
	
	connection.query("update tblUsers set txtUsername=?,txtPassword=?,txtFirstName=?,txtLastName=?,txtPhoneNo=?,txtWebsite=? where id=?;",[name,pass,fname,lname,phone,web,id], function (error, result, fields){
        if (error){
            callback(error);
            connection.destroy();
            throw error;
        }
        else {
           
            callback(error, result);
            connection.end(function (error) { callback(error, result);});
              
        }});
    
 };
 