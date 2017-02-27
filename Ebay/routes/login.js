



var mysql=require('./mysql1');
var ejs = require("ejs");
var mq_client = require('../rpc/client');
var bcrypt = require('bcryptjs');

var createlog=require("./createLog");


var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myEbay";
var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	//console.log("in checklogin");
	var username = req.param("user");
	var password = req.param("pass");
	
	
	console.log(username+" "+password);
	ejs.renderFile('./views/login.ejs',function(err, result) {
		// render on success
		if (!err) {
		res.end(result);
		}
		// render or error
		else {
		res.end('An error occurred');
		console.log(err);
		}
		});
	};
	
	exports.loginDetails=function(req,res)
	{
		
		//var getUser="select * from test.users where username='"+req.param("inputUsername")+"' and password='" +req.param("inputPassword") +"'";
		//console.log("Query is11:"+getUser);
		
		var json_responses;
		var username = req.param("user");
		var password = req.param("pass");
		var hashpass=bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		
		console.log(hashpass);
		
var hashpass1=bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		
		console.log(hashpass1);
		
		console.log(bcrypt.compareSync(password, hashpass));
		console.log(bcrypt.compareSync(password, hashpass1));
		
		
		
		var msg_payload = { "username": username, "password": password,"queue":"login" };
		
		console.log("In POST Request = UserName:"+ username+" "+password);
		
		mq_client.make_request('login_queue',msg_payload, function(err,results){
			
			console.log("RESPONSE : "+results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode === 200){
					console.log("valid Login "+results);
					
					req.session.fname=results.fname;
					req.session.lastname=results.lastname;
					req.session.email=results.email;
					req.session.mobile=results.mobile;
					req.session.handle=results.handle;
					req.session.userid=results._id;
					req.session.username=results.email;
					var json_responses={"statusCode" : 200,"fname":results.fname};
					res.send(json_responses);
				}
				else {    
					
					console.log("Invalid Login");
					res.send({"statusCode" : 401});
				}
			}  
		});
};
	exports.signup=function(req,res)
	{
		console.log("here");
		var json_responses;
		var email = req.param("email");
		var password = req.param("pass");
			//bcrypt.hashSync(req.param("pass"),bcrypt.genSaltSync(9));
		var fname=req.param("fname");
		var lname=req.param("lname");
		var phn=req.param("phn");		
		var handle=(fname+"_"+lname).substr(0, 8);
var msg_payload = { "email": email, "password": password,"fname":fname,"lname":lname,"phn":phn,"handle":handle,"queue":"register" };
		
		mq_client.make_request('register',msg_payload, function(err,results){
			
			console.log("RESPONSE : "+results.value);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode === 200){
					console.log(results.value);
					
					res.send(results);
				}
				else {    
					
					console.log("Invalid Login");
					res.send({"statusCode" : 401});
				}
			}  
		});
		
		
		/*var query = "insert into user(firstname,lastname,email,password,mobile,ebayhandle,personal,business) values ('"+fname+"','"+lname+"','"+email+"','"+password+"','"+phn+"','"+handle+"','N','N')";
		console.log(query);
		mysql.fetchData(function(err,results){
			if(err){
			throw err;
			}
			else
			{
				console.log(results.affectedRows);
			if(results.affectedRows > 0){
			//console.log("Inserted"+results[0].firstname);
			req.session.username=results[0].firstname;
			json_responses = {"statusCode" : 200};
			console.log("before redirect");
			res.send(json_responses);
			createlog.setlog(results[0].email+" Registered into system");

			}
			else {
			console.log("Invalid Login");
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
			
			}
			}
			},query);*/
};
exports.redirectToHomepage = function(req,res)
{
	
		res.redirect('/');
	
};

/*function afterSignIn(req,res)
{
// check user already exist
var getUser="select * from test.users where username='"+req.param("inputUsername")+"' and password='" +req.param("inputPassword") +"'";
console.log("Query is11:"+getUser);
mysql1.fetchData(function(err,results){
if(err){
throw err;
}
else
{
if(results.length > 0){
console.log("valid Login");
ejs.renderFile('./views/index.ejs', {
data: results } , function(err, result) {
// render on success
if (!err) {
res.end(result);
}
// render or error
else {
res.end('An error occurred');
console.log(err);
}
});
}
else {
console.log("Invalid Login");
ejs.renderFile('./views/failLogin.ejs',function(err, result) {
// render on success
if (!err) {
res.end(result);
}
// render or error
else {
res.end('An error occurred');
console.log(err);
}
});
}
}
},getUser);
}
*/
//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{

};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

