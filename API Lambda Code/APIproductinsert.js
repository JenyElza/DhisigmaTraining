var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "database-1.cq6avrntdh5x.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "jenysdatabase",
    database: "ecommerceweb"
}); 

exports.handler = (event, context, callback) =>{
    var data = JSON.parse(event.body);
    
    var name = data.txtProdName;
    var price = data.txtProdPrice;
    var pcat = data.refProdCategory;
    
    
    if (price.length === 0) {
        callback("Productprice is empty")
        return;
    }
    if (name.length === 0) {
        callback("Productname is empty")
        return;
    }
    if (pcat.length === 0) {
        callback("Productcategory is empty")
        return;
    }
	
    connection.query("insert into tblProduct (txtProdName,txtProdPrice,refProdCategory) values (?,?,?);",[name,price,pcat], function (error, result, fields){
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
 
 
 {
  "task":"putuser",
  "txtProdName":"Doll",
  "txtProdPrice":"300",
  "refProdCategory":"4"
}