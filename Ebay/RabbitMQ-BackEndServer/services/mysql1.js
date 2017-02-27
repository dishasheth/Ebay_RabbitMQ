/**
 * http://usejsdoc.org/
 */
var ejs= require('ejs');//importing module ejs
var mysql = require('mysql');//importing module mysql
var pool = [],free = [], req = [];
var current_connection;

function getConnection(){
	var connection = mysql.createConnection({
		
		
	host : 'localhost', 
	user : 'root', 
	password : 'system', 
	database : 'ebay1', 
	port : 3306 
	});
	return connection;
	}

function Pool()
{
    
    for(var i=0; i < 50; ++i)
	{
        pool.push(getConnection());
        free.push(i);
	}
}

Pool.prototype.get = function(request_name)
{
	if(free.length > 0)
    {
		var connection = pool[free.length-1];
	    free.pop();
	    current_connection = connection;
	    return free.length;
    }
	else
	{
		req.push(request_name);
		return null;
	}
}

Pool.prototype.release = function(number)
{
	free.push(number);
	if(req.length > 0)
	{
		Pool.get(req[0]);
		req.slice(0,1);
	}
}
var p=new Pool();
//fetching the data from the sql server
function fetchData(callback,sqlQuery){
console.log("\nSQL Query::"+sqlQuery);

//Implementation of Connection pool

console.log("\nSQL Query::"+sqlQuery);
var number = p.get(sqlQuery);
var connection = current_connection;
console.log('Connection established');
connection.query(sqlQuery, function(err, rows, fields) {
	 if(err){ 
		 console.log("ERROR: " + err.message);
	
		 callback(err, err.message);
		 }
	 else   {
		 console.log("DB Results:"+rows);
		 callback(err, rows);
		 }
	 }); 
	console.log("\nConnection closed.."); 
	p.release(number);
}



function insertData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	
	var pool=getConnection();

	pool.getConnection(function(err, connection) {
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
			}
			else
			{ 
				if(rows.length>0)
					{
				// return err or result
			console.log(rows.toString());
			console.log("DB Results:"+rows[0].firstname);
					}
			callback(err, rows);
			}
			});
		
		connection.release();
	})
	
	console.log("\nConnection closed..");
	
	}

exports.fetchData=fetchData;
exports.insertData=insertData;