var mysql=require('./mysql1');
var createlog=require("./createLog");


exports.myebay = function(req, res){

	if(req.session.fname)
	res.render('myebay');
	else
	res.redirect('/login');
};

exports.getpurchase=function(req,res)
{
	var userid=req.session.userid;
	var purchase_query="select b.prod_name,a.quantity,b.prod_cost,b.prod_condition from buyerinfo a,product b where a.prod_id=b.prod_id and a.user_id="+userid;
		
	mysql.fetchData(function(err,results){
		if(err){
			
		throw err;
		
		}
		else
		{
		if(results.length > 0){
		for(var i=0;i<results.length;i++)	
		console.log("valid Login"+results[i].prod_id);
		json_responses = {"statusCode" : 200,"resultsofpurchase":results};
		console.log("before redirect");
		res.send(json_responses);
		}
		else {
		console.log("No products purchased");
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
		
		}
		}
		},purchase_query);
	

	
	
	};
	
	
	
	exports.getsell=function(req,res)
	{
		var userid=req.session.userid;
		var sell_query="select * from product where prod_seller="+userid;	
	
		mysql.fetchData(function(err,results){
			if(err){
				
			throw err;
			
			}
			else
			{
			if(results.length > 0){
			for(var i=0;i<results.length;i++)	
			console.log("valid Login"+results[i].prod_name);
			json_responses = {"statusCode" : 200,"resultsofsell":results};
			console.log("before redirect");
			res.send(json_responses);
			}
			else {
			console.log("No products sold");
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
			
			}
			}
			},sell_query);
		
		
		};