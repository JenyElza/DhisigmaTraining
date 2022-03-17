var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-1.cq6avrntdh5x.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "jenysdatabase",
    database: "ecommerceweb"
}); 

    exports.handler = (event, context, callback) =>{
    
    
    
    connection.query("select id, txtCountryName from tblCountry;", function (error, result, fields){
        if (error){
            callback(error,result);
            connection.destroy();
            throw error;
        }
        else {
            
            callback(error, result);
            connection.end(function (error) { callback(error, result);});
              
        }});
    
 };
 