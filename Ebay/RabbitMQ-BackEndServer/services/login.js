var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/myEbay";



var getProduct = function(size, quantity, productid, res, address, length,productsincart,username,callback) {
	var name = "";
	var cost = "";
	var brand = "";
	var image = "";
	var counter=0;
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		 var o_id = require('mongodb').ObjectID(productid);
	mongo.collection('product').find({"_id": o_id}).toArray( function(err, rows){
		console.log("ROWS :"+rows);
		if(rows) {
			counter = counter + 1;
			console.log("Entering /addtocart" + quantity);
			for (var i in rows) {
				name = rows[i].prod_name;
				cost = rows[i].prod_cost;
				brand = rows[i].brand;
				image = rows[i].img;
				var product = {
					"name" : name,
					"size" : size,
					"quantity" : quantity,
					"cost" : cost,
					"brand" : brand,
					"image" : image

				};
				console.log("add to cart" + product);
				productsincart.push(product);

			}
			console.log(counter);
			console.log(length);
					if (counter === length) {
						res = {
							"statusCode" : 200,
							"pdetails" : productsincart,
							"address" : address
						};
						callback(null,res);
					}
					else{
						console.log("No product");
						res={
								"statusCode":401
								};
						callback(null,res);
					}
					console.log(res);
			}
		else{
			console.log("No product");
			res={
					"statusCode":401
					};
			callback(null,res);
		}	
		
		
	
	});
	});
	return counter;
};


function handle_request(msg, callback){
	if(msg.queue==="login"){
	var username = msg.username;
	var password = msg.password;
	console.log(password +" is the object");
	var res={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.findOne({"email": username, "password":password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				/*req.session.username = user.username;*/
				mongo.collection('session').insertOne({"username":username,"userid":user._id});
				console.log(user +" is the session");
				res = {"statusCode" : 200,"fname":user.firstname,"lastname":user.lastname,"email":user.email,"mobile":user.mobile,"_id":user._id,"handle":user.ebayhandle};

			} else {
				console.log("returned false login");
				res = {"statusCode" : 401};
			}
			callback(null, res);
		});
		
	});
}
	else if(msg.queue==="register"){
		var email = msg.email;
		var password = msg.password;
		var fname=msg.fname;
		var lname=msg.lname;
		var phn=msg.phn;		
		var handle=msg.handle;
		
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('login');

			coll.insertOne({"email": email, "password":password,"firstname":fname,"lastname":lname,"mobile":phn,"ebayhandle":handle,"personal":"Y","business":"N"}, function(err, user){
				
					res = {"statusCode" : 200};

				
				callback(null, res);
			});
			
		});
	}
	else if(msg.queue==="checkout")
		{
		var counter = 0;
		var quantity = "";
		var size = "";
		var products = [];
		var address = "";
		var productsincart = [];
		var res={};
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			 var o_id = require('mongodb').ObjectID(msg.username);

			 console.log("USERID :"+o_id);
				mongo.collection('login').find({"_id":o_id}).toArray( function(err, rows){
				if (rows) {
					
					 address = rows.address;
						
						if (msg.direct === "true") {
							console.log("Entering direct true" + msg.prod_id);
							
							getProduct(msg.size, msg.quantity, msg.prod_id, res, address, 1,
									productsincart,msg.username,callback);
							console.log("TRUE "+productsincart);
						//	callback(null,res);
						} else {

					
					mongo.collection('shoppingcart').find({"user_id":msg.username}).toArray( function(err, rows){
						if (rows) {
							
							
							console.log("Entering /addtocart" + rows+"   "+rows.length);
							for ( var i in rows) {
								console.log("PRODID"+rows[i].prod_id);
								var productid = rows[i].prod_id;
								quantity = rows[i].quantity;
								size = rows[i].size;
								products.push(rows[i]);

							}
							console.log(products+"  "+products.length);
							var k = 0;

							for (k in products) {
								getProduct(products[k].size,
										products[k].quantity,
										products[k].prod_id, res, address,
										products.length, productsincart,username,callback);
							}
							console.log("FALSE : "+res.statusCode);
						//	callback(null,res);	
						}
						
						
						});	
					
					
				}
				
				}
				});
	});
		}
	
	else if(msg.queue==="cart")
		{
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
		
				mongo.collection('shoppingcart').find({"user_id":msg.username}).toArray( function(err, rows){
				if (rows) {
					// This way subsequent requests will know the user is logged in.
					/*req.session.username = user.username;*/
				
						var name="";
						var quantity="";
						var cost="";
						var size="";
						var brand="";
							var image="";
							var products=[];
						for ( var i in rows) 
						{
							var productid=rows[i].prod_id;
							quantity=rows[i].quantity;
							size=rows[i].size;
							products.push(rows[i]);
							
														
						}
						var j=0;
						var counter=0;
						var productsincart=[];
						for (j in products)
							{
							console.log(products[j].prod_id);
							/*var ObjectId = require('mongodb').ObjectId; 
							var id = products[j].prod_id;     
							var o_id = new ObjectId(id);*/
							
							
							 var o_id = require('mongodb').ObjectID(products[j].prod_id);
							 console.log(o_id);
					//	var id="ObjectId(\""+products[j].prod_id+")";
					//		mongo.collection('product').find({"prod_name":"2States"}).toArray( function(err, rows)
		mongo.collection('product').find({"_id":o_id}).toArray( function(err, rows)	
		{
								quantitynew=products[counter].quantity;
								sizenew=products[counter].size;
								counter=counter+1;
								for(i in rows)
									{
									console.log(rows[i].prod_name+"  "+i.prod_name);
									name=rows[i].prod_name;
									cost=rows[i].prod_cost;
									brand=rows[i].brand;
									image=rows[i].img;
									var productid=rows[i]._id;
									var	product=
									{
											"name":name,
											"size":sizenew,
											"quantity":quantitynew,
											"cost":cost,
											"brand":brand,
											"image":image,
											
									"id":productid
											
									};
								productsincart.push(product);
									
									}
									if(counter==products.length)
							{
										json_responses={
												"statusCode":200,
												"pdetails":productsincart
												};
								//		res.send(json_responses);
										callback(null,json_responses);
							}
									});
									
							}

									
							
						

				}; 
				//callback(null, res);
			
			
		});
		
				});
		}
	else if(msg.queue==="addtocart")
		{
		var productsincart=[];
		var products=[];
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			
			console.log("PRODUCT ID "+msg.prod_id);
			mongo.collection('shoppingcart').insertOne({"user_id":msg.username,"prod_id":msg.prod_id,"quantity":msg.quantity,"size":msg.size});
			mongo.collection('shoppingcart').find({"user_id": msg.username}).toArray( function(err, rows){
				if (rows) {
					// This way subsequent requests will know the user is logged in.
					
						var name="";
						var quantity="";
						var cost="";
						var size="";
						var brand="";
							var productid="";
							var image="";
						for ( var i in rows) 
						{
							 productid=rows[i].prod_id;
							quantity=rows[i].quantity;
							size=rows[i].size;
							products.push(rows[i]);
							
														
						}
						console.log("PRODUCTS : "+products);
						var j=0;
						var counter=0;
						for (j in products)
							{
					mongo.collection('product').find({"prod_id": j.prod_id}).toArray( function(err, rows){
						
						
						if (err) 
						{
							throw err;
						}
						else 
						{
							var quantitynew=products[counter].quantity;
							var sizenew=products[counter].size;
							counter=counter+1;
							for(var i in rows)
								{
								name=rows[i].prod_name;
								cost=rows[i].prod_cost;
								brand=rows[i].brand;
								image=rows[i].img;
								productid=rows[i]._id;
								
								var	product=
								{
										"name":name,
										"size":sizenew,
										"quantity":quantitynew,
										"cost":cost,
										"brand":brand,
										"image":image,
										"id":productid
										
								};
							productsincart.push(product);
								console.log("productsincart1 "+productsincart );
								}
								if(counter===products.length)
						{
									console.log("productsincart2 "+productsincart );
									var json_responses={
											"statusCode":200,
											"pdetails":productsincart
											};
									console.log(json_responses);
									//res.send(json_responses);
									callback(null,json_responses);
						}
							

						}
						
						
						
						
						//res = {"statusCode" : 200,"fname":user.firstname,"lastname":user.lastname,"email":user.email,"mobile":user.mobile,"_id":user._id,"handle":user.ebayhandle};
					});
							}
					
				}
			//	callback(null, res);
			});
			
			
			
		});

		}
	else if(msg.queue==="sell")
		{
		
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('categories');

			coll.findOne({"name": msg.category}, function(err, user){
				if (user) {
					// This way subsequent requests will know the user is logged in.
					/*req.session.username = user.username;*/
					console.log("Results :"+user);
					prod_cat=user.id;
					
					console.log(prod_cat+" "+msg.seller);
					mongo.collection('product').insertOne({"prod_name":msg.title,"prod_category":prod_cat,"prod_seller":msg.seller,"prod_quantity":msg.quantity,"prod_cost":msg.price,"brand":msg.brand,"prod_condition":msg.condition,"prod_size":msg.size,"details":msg.details,"prod_listing":msg.listing,"prod_starting":msg.starting});
					console.log(user +" is the session");
					res = {"statusCode" : 200,"fname":user.firstname,"lastname":user.lastname,"email":user.email,"mobile":user.mobile,"_id":user._id,"handle":user.ebayhandle};

				}/* else {
					console.log("returned false login");
					res = {"statusCode" : 401};
				}*/
				callback(null, res);
			});
		});
		}

		
	else if(msg.queue==="search")
	{
		console.log(msg.cat+" "+msg.pname);
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('product');
			
		coll.find({"prod_name": msg.pname}).toArray( function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				/*req.session.username = user.username;*/
				console.log("Results :"+user+"  "+user.length);
				for(var i=0;i<user.length;i++)	
					console.log("valid Login"+user[i].prod_name);
					//createlog.setlog(req.session.email+" Searched for product "+pname+" and Category "+cat);
					json_responses = {"statusCode" : 200,"results":user};
					console.log("before redirect");
					//res.send(json_responses);
					callback(null,json_responses);
			

			}
			 else {
				console.log("returned false login");
				res = {"statusCode" : 401};
				callback(null, res);
			}
			
		});
		});
		}
	else if(msg.queue==="itemdetails")
	{
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
		console.log(msg.product);
		mongo.collection('product').find({"prod_name": msg.product}).toArray( function(err, rows){
			console.log("ROWS :"+rows);
			if(rows) {
				console.log("PRODUCTS "+rows+"  "+rows.length);
				var product={};
				for ( var i in rows) {
					var row = rows[i];
					console.log(row);
					product=
					{
							name:row.prod_name,
							condition:row.prod_condition,
							size:row.prod_size,
							quantity:row.prod_quantity,
							cost:row.prod_cost,
							brand:row.brand,
							image:row.img,
							prod_id:row._id
							
					};
					var json_responses={
							"statusCode":200,
							"pdetails":product
							};
					callback(null,json_responses);

				}
				
			}
			else{
				console.log("No product");
				var json_responses={
						"statusCode":401
						};
				callback(null,json_responses);
			}
		
		});
	});
		}
	else {
		var json_responses = {
			"statusCode" : 401
		};
		callback(null,json_responses);

		
		}
}





exports.handle_request = handle_request;