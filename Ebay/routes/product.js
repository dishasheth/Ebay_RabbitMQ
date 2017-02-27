/**
 * New node file
 */
var mysql=require('./mysql1');
var createlog=require("./createLog");
var mq_client = require('../rpc/client');
var bcrypt = require('bcryptjs');


exports.product = function(req, res){
  res.render('product', { title: 'product' });
};

exports.addToCart=function(req,res)
{
	var json_responses;
	var prod_id = req.param("prod_id");
	var quantity = req.param("quantity");
	var size = req.param("size");
	var username="";
	var productsincart=[];
	var products=[];
	if(req.session.username)
	{
	//	logger.log(req.session.username+ " entering /addtocart"+prod_id );
	}
	if(req.session.userid)
		{
			username=req.session.userid;
			email=req.session.email;
			createlog.setlog(email+" Entered into product page");
			
			var msg_payload = { "username":username,"email":email,"prod_id":prod_id,"quantity":quantity,"size":size,"queue":"addtocart" };
			mq_client.make_request('addtocart',msg_payload, function(err,results){
				
				console.log("RESPONSE : "+results);
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
						
						res.send({"statusCode" : 401});
					}
				}  
			});
			
/*			mysql.fetchData(
					
					function(err, rows, fields) {
						if (err) {
							throw err;
						} else {
							
							if(req.session.username)
							{
							//	logger.log(req.session.username+ " added item to cart with product id: "+prod_id );
							}
							mysql.fetchData(
									
									function(err, rows, fields) {
										if (err) {
											throw err;
										} else 
										{
											var name="";
											var quantity="";
											var cost="";
											var size="";
											var brand=""
												var productid="";
												var image="";
											for ( var i in rows) 
											{
												 productid=rows[i].prod_id;
												quantity=rows[i].quantity;
												size=rows[i].size;
												products.push(rows[i]);
												
																			
											}
											var j=0;
											var counter=0;
											for (j in products)
												{
												
												mysql.fetchData(
														function(err, rows, fields)
														{
															if (err) 
															{
																throw err;
															}
															else 
															{
																quantitynew=products[counter].quantity;
																sizenew=products[counter].size
																counter=counter+1;
																for(i in rows)
																	{
																	name=rows[i].prod_name;
																	cost=rows[i].prod_cost;
																	brand=rows[i].brand;
																	image=rows[i].img;
																	productid=rows[i].prod_id;
																	
																	var	product=
																	{
																			"name":name,
																			"size":sizenew,
																			"quantity":quantitynew,
																			"cost":cost,
																			"brand":brand,
																			"image":image,
																			"id":productid
																			
																	}
																productsincart.push(product);
																	
																	}
																	if(counter==products.length)
															{
																		json_responses={
																				"statusCode":200,
																				"pdetails":productsincart
																				};
																		res.send(json_responses);
															}
																

															}
														},"Select * from product where prod_id="+products[j].prod_id);
												
												}
											
										}
										
							
						},"Select * from shoppingcart where user_id="+username);}},
//						"Insert into shoppingcart(user_id,prod_id,quantity,size) values("+username+","+prod_id+","+quantity+",'"+size+"')");
						"Insert into shoppingcart(user_id,prod_id,quantity,size) values("+username+","+prod_id+","+quantity+",'"+size+"')");*/
		}
	else{
		json_responses={
				"statusCode":401
				};
		res.send(json_responses);
		
	}
	

	};
	
	
	exports.viewcart=function(req,res)
	{
		var json_responses;
	
		var username="";
		var productsincart=[];
		var products=[];
		console.log(req.session.userid);
		//if(req.session.userid)
		if(req.session.userid)
			{
			username=req.session.userid;
			createlog.setlog(req.session.email+" Entered into cart");
			var msg_payload = { "username":username,"queue":"cart" };
			mq_client.make_request('cart',msg_payload, function(err,results){
				
				console.log("RESPONSE : "+results);
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
						
						res.send({"statusCode" : 401});
					}
				}  
			});
			
			/*
				username=req.session.userid;
				createlog.setlog(req.session.email+" Entered into cart");									
								mysql.fetchData(
										
										function(err, rows, fields) {
											if (err) {
												throw err;
											} else 
											{
												var name="";
												var quantity="";
												var cost="";
												var size="";
												var brand=""
													var image="";
												for ( var i in rows) 
												{
													var productid=rows[i].prod_id;
													quantity=rows[i].quantity;
													size=rows[i].size;
													products.push(rows[i]);
													
																				
												}
												var j=0;
												var counter=0;
												for (j in products)
													{
													
													mysql.fetchData(
															function(err, rows, fields)
															{
																if (err) 
																{
																	throw err;
																}
																else 
																{
																	quantitynew=products[counter].quantity;
																	sizenew=products[counter].size
																	counter=counter+1;
																	for(i in rows)
																		{
																		name=rows[i].prod_name;
																		cost=rows[i].prod_cost;
																		brand=rows[i].brand;
																		image=rows[i].img;
																		var productid=rows[i].prod_id;
																		var	product=
																		{
																				"name":name,
																				"size":sizenew,
																				"quantity":quantitynew,
																				"cost":cost,
																				"brand":brand,
																				"image":image,
																				
																		"id":productid
																				
																		}
																	productsincart.push(product);
																		
																		}
																		if(counter==products.length)
																{
																			json_responses={
																					"statusCode":200,
																					"pdetails":productsincart
																					};
																			res.send(json_responses);
																}
																	

																}
															},"Select * from product where prod_id="+products[j].prod_id);
													
													}
												
											}
											
								
							},"Select * from shoppingcart where user_id="+username);
			*/}
		else{
			json_responses={
					"statusCode":401
					};
			res.send(json_responses);
			
		}
		
	
		};

	
exports.getproducts=function(req,res)
{
	
	var cat=req.param("pcat");
	//var pname="%"+req.param("pname")+"%";
	var pname=req.param("pname");
	console.log(cat);
	/*if(cat==="All%20Categories")
		{
			var query="select * from product where prod_name like '"+pname+"' or brand like '"+pname+"'";
		}
	else
		{
		var query="select * from product where prod_name like '"+pname+"' or brand like '"+pname+"' and prod_subcategory IN (select id from categories where name='"+cat+"') ";
		
		}*/
	
	var msg_payload = { "pname":pname,"cat":cat,"queue":"search" };
	mq_client.make_request('search',msg_payload, function(err,results){
		
		console.log("RESPONSE : "+results.statusCode+"  "+results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.statusCode === 200){
				console.log(results.results);
				
				res.send({"results":results.results,"statusCode" : 200});
			}
			else {    
				
				res.send({"statusCode" : 401});
			}
		}  
	});
	/*mysql.fetchData(function(err,results){
		if(err){
			console.log("Invalid Login");
		throw err;
		
		}
		else
		{
		if(results.length > 0){
		for(var i=0;i<results.length;i++)	
		console.log("valid Login"+results[i].prod_name);
		createlog.setlog(req.session.email+" Searched for product "+pname+" and Category "+cat);
		json_responses = {"statusCode" : 200,"results":results};
		console.log("before redirect");
		res.send(json_responses);
		}
		else {
		console.log("No products");
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
		
		}
		}
		},query);*/
	
	
	};
	
	exports.getItem=function(req,res)
	{
	var user=req.session.user_id;
	res.render('ProductDetails',{user:user});
	};
	
	exports.showcart=function(req,res)
	{
	var user=req.session.userid;
	res.render('cart',{user:user});
	createlog.setlog(req.session.email+" requested for cart");
	};
	
	exports.getItemDetails=function(req,res)
	{
		var json_responses;
		var product = req.param("prod");
		
		var msg_payload = { "product":product,"queue":"itemdetails" };
		mq_client.make_request('itemdetails',msg_payload, function(err,results){
			
			console.log("RESPONSE : "+results.statusCode+"  "+results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode === 200){
					console.log(results.pdetails);
					
					res.send({"pdetails":results.pdetails,"statusCode" : 200});
				}
				else {    
					
					res.send({"statusCode" : 401});
				}
			}  
		});
		
/*		mysql.fetchData(
				
				function(err, rows, fields) {
					if (err) {
						throw err;
					} else {
						var product={};
						for ( var i in rows) {
							var row = rows[i];

							product=
							{
									name:row.prod_name,
									condition:row.prod_condition,
									size:row.prod_size,
									quantity:row.prod_quantity,
									cost:row.prod_cost,
									brand:row.brand,
									image:row.img,
									prod_id:row.prod_id
									
							}
							json_responses={
									"statusCode":200,
									"pdetails":product
									};
							res.send(json_responses);

						}
						
					}
					},"Select * from product where prod_name='" + product + "'");*/
		};

	
	exports.getSubcats = function(req, res) {
		var json_responses;
		var fparent = req.param("cat");
		console.log("Entering /subcats"+fparent);
		

			mysql.fetchData(function(err, rows, fields) {
								if (err) {
									throw err;
								} else {
									var cat_id;
								console.log("Fetching category for categoryid"+fparent);
									for ( var i in rows) {
										var row = rows[i];

										var name = row.name;
										fparent = row.id;
									}
								}

								var json_responses;
								var categories = {};
								console.log("Fetching sub categories..............")
								var cats = [];
								mysql.fetchData(function(err,
										rows, fields) {
									if (err) {
										throw err;
									} else {
										var cat_id;
										console.log("results is" + rows);
										for ( var i in rows) {
											var row = rows[i];

											var name = row.name;
											cat_id = row.id;
											cats.push(row)
											console.log(cat_id);

										}
										var subcats = [];
										for ( var i in cats) {
											mysql.fetchData(function(err, rows, fields) {
												var allcategories = [];
												if (err) {
													throw err;
												} else {
													for ( var j in rows) {
														allcategories.push(rows[j].name);
													}
													subcats.push(allcategories);
													console.log(allcategories);
													// console.log(name)
													if (cats.length == subcats.length) {
														for ( var i in cats) {
															var name = cats[i].name;
															console.log(name);
															categories[cats[i].name] = subcats[i];

														}
														var products=[];
														mysql.fetchData(function(err, rows, fields) {
																	if (err) {
																		throw err;
																	} else {
																		var cat_id;
																	console.log("Fetching products for categoryid"+fparent);
																		for ( var i in rows) {
																			var row = rows[i];

																			var name = row.prod_name;
																			products.push(name)
																			
																		}
																		console.log(categories);
																		console.log(products);
																		json_responses = {
																			"statusCode" : 200,
																			"category" : categories,
																			"products" : products
																		};
																		res.send(json_responses);
																		console.log("Done Fetching sub categories..............");

																	}},"Select * from product where prod_category='" + fparent + "'");
																										}
												}
											},"Select * from categories where parent="
											+ cats[i].id);
										}
									}
								},"Select * from categories where parent="+fparent);
							},"Select * from categories where name='" + fparent + "'");
			
		};
		
		
		
		exports.removefromcart=function(req,res)
		{
			if(req.session.userid)
				{
				var id=req.param("id");
				mysql.fetchData(function(err,rows)
						{
							if(err)
								{
								throw err;
								}
							else
							{
								
								res.redirect("/rendercart");
								
							}
						},"Delete from shoppingcart where prod_id="+id+" and user_id="+req.session.userid);
				
				}
			
		}