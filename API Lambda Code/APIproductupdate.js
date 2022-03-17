var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-1.cq6avrntdh5x.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "jenysdatabase",
    database: "ecommerceweb"
}); 


exports.handler = (event, context, callback) =>{
    var data = JSON.parse(event.body);
	
	var pid = data.id;
	var name = data.txtProdName;
    var price = data.txtProdPrice;
    var pcat = data.refProdCategory;
	
	connection.query("update tblProduct set txtProdName=?,txtProdPrice=?,refProdCategory=? where id=?;",[name,price,pcat,id], function (error, result, fields){
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
 