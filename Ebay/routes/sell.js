/**
 * New node file
 */
var mysql=require('./mysql1');
var createlog=require("./createLog");
var mq_client = require('../rpc/client');
var bcrypt = require('bcryptjs');

exports.sellProduct = function(req, res){

	if(req.session.fname)
	res.render('sell');
	else
	res.redirect('/login');
};


exports.addCategory=function(req,res){
	console.log("here");
	var json_responses;
	var cat=[];
	var query = "select * from categories where parent in (select id from categories where parent=0)";
	console.log(query);
	mysql.fetchData(function(err,results){
		if(err){
		throw err;
		}
		else
		{
		for(var i=0;i<results.length;i++){
			cat.push(results[i].name);
		}
		console.log(cat);
		//console.log("Inserted"+results[0].firstname);
		/*req.session.username=results[0].firstname;*/
		json_responses = {"statusCode" : 200,"cat" : cat};
		console.log("before redirect");
		res.send(json_responses);
		
		}
		},query);	
}



exports.addProduct=function(req,res)
{
	console.log("here");
	var json_responses;
	var title = req.param("title");
	var size = req.param("size");
	var condition=req.param("condition");
	var brand=req.param("brand");
	var details=req.param("details");
	var category=req.param("category").trim();
	var starting=req.param("starting");
	var price=req.param("price");
	var quantity=req.param("quantity");
	var size=req.param("size");
	var listing="fixed";
	var prod_cat="";
	var seller=req.session.userid;
	if(starting==undefined){ starting=0; }
	if(req.param("fixed")===true){ listing="auction";}
	/*var query = "insert into product(prod_title,prod_brand,details,prod_listing,prod_starting,prod_price,prod_quantity,prod_condition) values ('"+title+"','"+brand+"','"+details+"','"+listing+"','"+starting+"','"+price+"','"+quantity+"','"+condition+"')";*/
	var msg_payload = {"queue":"sell","title":title,"size":size,"condition":condition,"brand":brand,"details":details,"category":category,
			"starting":starting,"price":price,"quantity":quantity,"listing":listing,"seller":seller};
	mq_client.make_request('sell',msg_payload, function(err,results){
		
		console.log("RESPONSE : "+results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode === 200){
				var json_responses={"statusCode" : 200};
				res.send(json_responses);
			}
			else {    
				
			//	console.log("Invalid Login");
				res.send({"statusCode" : 401});
			}
		}  
	});	
	
/*	mysql.fetchData(function(err,results){
		if(err){
		throw err;
		}
		else
		{
			console.log("Results :"+results);
			prod_cat=results[0].id;
			
			console.log(prod_cat+" "+seller);
			var query = "insert into product(prod_name,prod_category,prod_seller,prod_quantity,prod_cost,brand,prod_condition,prod_size,details,prod_listing,prod_starting) values ('"+title+"','"+prod_cat+"','"+seller+"','"+quantity+"','"+price+"','"+brand+"','"+condition+"','"+size+"','"+details+"','"+listing+"','"+starting+"')";
			console.log(query);
			mysql.insertData(function(err,results){
				if(err){
				throw err;
				}
				else
				{
				json_responses = {"statusCode" : 200};
				console.log("before redirect");
				res.send(json_responses);
				}
				},query);
			
			
		}
		},"select id from categories where name='"+category+"'");*/
	
	

};