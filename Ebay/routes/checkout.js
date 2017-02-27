var mysql = require("./mysql1");
var counter = 0;
var createlog=require("./createLog");
var mq_client = require('../rpc/client');
var bcrypt = require('bcryptjs');

exports.rendercheckout = function(req, res) {
	if (req.session.userid) {
		var user = req.session.username;
		res.render('Checkout', {
			user : user
		});

	} else {
		res.render('login', {
			title : "Please Login first"
		});
	}
};

exports.checkout = function(req, res) {
	var json_responses;
	var direct = "";

	direct = req.param("direct");
	var username = "";

	counter = 0;
	if (req.session.userid) {
		var username = req.session.userid;
		var prod_id = req.param("prod_id");
		quantity = req.param("quantity");
		size = req.param("size");
		var msg_payload = {"queue":"checkout","username":username,"direct":direct,"prod_id":prod_id,"quantity":quantity,"size":size };
		mq_client.make_request('checkout',msg_payload, function(err,results){
			
			console.log("RESPONSE : "+results.address+" "+results.statusCode+"   "+results.pdetails);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode === 200){
					
					res.send(results);
				}
				else {    
					
				//	console.log("Invalid Login");
					res.send({"statusCode" : 401});
				}
			}  
		});


	}
};
/*var getProduct = function(size, quantity, productid, res, address, length,
		productsincart,username) {
	var name = "";
	var cost = "";
	var brand = ""
	var image = "";

	mysql.fetchData( function(
			err, rows, fields) {
		if (err) {
			throw err;
		} else {
			counter = counter + 1;
			console.log("Entering /addtocart" + quantity);
			for (i in rows) {
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

				}
				console.log("add to cart" + product);
				productsincart.push(product);

			}
			
					if (counter == length) {
						json_responses = {
							"statusCode" : 200,
							"pdetails" : productsincart,
							"address" : address
						};
						res.send(json_responses);
					}
				
				
		

		}
	},"Select * from product where prod_id=" + productid);
	return counter;
};
*/exports.pay = function(req, res) {
	var json_responses;
	var direct = "";

	direct = req.param("direct");
	var username = "";

	counter = 0;
	if (req.session.userid) {
		var username = req.session.userid;
		var quantity = "";
		var size = "";
		var products = [];
		var address = "";
		var productsincart = [];
		console.log("Entering direct" + direct);
		if (direct == "true") {

			var prod_id = req.param("prod_id");
			quantity = req.param("quantity");
			size = req.param("size");
			console.log("Entering direct true" + prod_id + " " + size + " "
					+ quantity);
			 
				insertbuyerinfo(size, quantity, prod_id, res, 1, username)
		

		} else {

			mysql.fetchData(function(err, rows, fields) {
				if (err) {
					throw err;
				} else {

					for ( var i in rows) {
						var productid = rows[i].prod_id;
						quantity = rows[i].quantity;
						size = rows[i].size;
						products.push(rows[i]);

					}
					var k = 0;

					for (k in products) {
						
						insertbuyerinfo(products[k].size, products[k].quantity,
								products[k].prod_id, res, products.length,
								username);

					}
				}
			},"Select * from shoppingcart where user_id="
			+ username);
		}

	}

	else {
		json_responses = {
			"statusCode" : 401
		};
		res.send(json_responses);

	}

};
var insertbuyerinfo = function(size, quantity, productid, res, length, username) {
	mysql.fetchData( function(
			err, rows) {
		var prod = rows[0];
		console.log(prod.prod_quantity+"  "+quantity);
		if (prod.prod_quantity >= quantity) {
			var newquantity = prod.prod_quantity - quantity;
			console.log(newquantity);
			mysql.fetchData( function(err, rows) {
				if (err) {
					throw err
				} else {
					mysql.fetchData(function(err, rows) {
						if (err) {
							throw err
						} else {
							counter = counter + 1;
							if (counter == length) {
								mysql.fetchData( function(err,rows)
										{
									if(err)
										{
										throw err;
										}
									else
									{
								json_responses = {
									"statusCode" : 200
								};
								res.send(json_responses);
							}},"Delete from shoppingcart where user_id="+username);}

						}
					},"insert into buyerinfo values (" + username
					+ "," + productid + "," + quantity + ",'" + size
					+ "')" );
				}
			},"update product set prod_quantity=" + newquantity
			+ " where prod_id=" + productid);

		} else {
			json_responses = {
					"statusCode" : 402
				};
				res.send(json_responses);
		}
	},"select * from product where prod_id=" + productid);

};
var updatequantity = function(quantity, productid, res, length) {
	mysql.fetchData( function(
			err, rows) {
		var prod = rows[0];
		console.log(prod.prod_quantity);
		if (prod.prod_quantity >= quantity) {
			var newquantity = prod.prod_quantity - quantity;
			console.log(newquantity);
			mysql.fetchData( function(err, rows) {
				if (err) {
					throw err
				} else {
					counter = counter + 1;
					if (counter == length) {
						return true;
					}
				}
			},"update product set prod_quantity=" + newquantity
			+ " where prod_id=" + productid);

		} else {
			return false;
		}
	},"select * from product where prod_id=" + productid);

};
