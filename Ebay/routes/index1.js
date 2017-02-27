/**
 * New node file
 */
var mysql = require("./mysql1");
exports.checkSession=function(req,res){
	console.log("in node");
	var json_responses;
	if(req.session.fname){
		json_responses = {"statusCode" : 200,"fname":req.session.fname,"lastname":req.session.lastname,"email":req.session.email,"mobile":req.session.mobile,"handle":req.session.ebayhandle};
	}
	else{
		json_responses = {"statusCode" : 401};
	}
	res.send(json_responses);
	};
	
	exports.getproducts = function(req, res) {
		var category = req.param("cat");
		var user;
		if (req.session.user_id) {
			user = req.session.user_id;
		}
		res.render('Products', {
			category : category,
			user : user
		});

	};
	
	exports.getCategories = function(req, res) {
		var json_responses;
		var categories = {};
		console.log("Fetching cateories..............")
		var cats = [];
		mysql.fetchData( function(err,
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
								console.log(categories)
								json_responses = {
									"statusCode" : 200,
									"category" : categories
								};
								res.send(json_responses);
								console.log("Done Fetching cateories..............");
							}
						}
					},"Select * from categories where parent="
					+ cats[i].id);
				}
			}
		},"Select * from categories where parent=0");

	};