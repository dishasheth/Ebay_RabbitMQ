var products = angular.module('products', []);
var mainCategory="";
// defining the login controller
products.controller('product', function($scope, $location, $http) {
	console.log("in login" + "dfyjj");
	var s1 = $location.absUrl();
	var params = s1.split("?");
	console.log(params[1]);
	var parValue = params[1].split("=");
	mainCategory = parValue[1];
	

	$scope.fname="";
	$scope.itinerary=[];
	$scope.prodlist=[];
	

$http({
	method : "GET",
	url : '/getCategories',
	data : {
		
	}
}).success(function(data) {

	console.log(JSON.stringify(data.category));//checking the response data for statusCode
	if (data.statusCode == 200) 
	{
		var keys=Object.keys(data.category);
		console.log(keys);
		
		var sbcats = document.getElementById('sbcats');
		var count=0;
			for(j=0;j<3;j++)
				{
				 var opt =document.createElement('tr');
				    opt.class="col-md-4";
				 sbcats.appendChild(opt);
				    
				    
				    for(k=0;k<3;k++)
					{
				    	 var td =document.createElement('td');
				    	
						 opt.appendChild(td);
						 var link =document.createElement('a');
					    td.appendChild(link);	
					    
						link.href="/getproducts?cat="+keys[count];
						link.innerHTML=keys[count];
						var ul =document.createElement('ul');
						td.appendChild(ul);
						console.log(data.category[keys[count]]);
						for(m in data.category[keys[count]])
							{
							var li =document.createElement('li');
							 var innerlink =document.createElement('a');
							innerlink.href="/getproducts?cat="+"\""+data.category[keys[count]][m]+"\"";
							innerlink.innerHTML=data.category[keys[count]][m];
							li.appendChild(innerlink);
							ul.appendChild(li);
							}
						
						count+=1;
						if(count==keys.length)
							{
							break;
							}
					}
				    if(count==keys.length)
					{
					break;
					}
				
		}
	}
	else
		{
	

		}
		//Making a get call to the '/redirectToHomepage' API
		//window.location.assign("/homepage"); 
}).error(function(error) {
	
});



	$http({
		method : "GET",
		url : '/addcat',
		data : {
			
		}
	
	}).success(function(data) {
		//checking the response data for statusCode
		
			console.log("in success");
			for(var i=0;i<data.cat.length;i++){
			$scope.itinerary.push({ 'name':data.cat[i] });
			}}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
	).error(function(error) {
		console.log("in error2");
	});
	
	
	
	$http({
		method : "POST",
		url : '/checkSession',
		data : {
			
		}}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode=== 200) {
				
				$scope.notlogin=true;
				$scope.login=false;
				$scope.fname=data.fname;
			}
			else
				{
				
				$scope.notlogin=false;
				$scope.login=true;
				
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.notlogin=true;
			$scope.login=true;
		});
	$scope.getsearch=function(){
		
		//console.log('in hghfg');
		var pname=$scope.searchbar;
		var cat=$scope.cat;
		console.log(pname+" "+cat);
	
				
				window.location="/prodlist?pname="+$scope.searchbar+"&&pcat="+$scope.cat;
				
	};
	
	
	
	$http({
		method : "GET",
		url : '/getCategories',
		data : {
			
		}
	}).success(function(data) {

		console.log(JSON.stringify(data.category));//checking the response data for statusCode
		if (data.statusCode == 200) 
		{
			var keys=Object.keys(data.category);
			console.log(keys);
			var sel = document.getElementById('gh-cat');
			 var opt =document.createElement('option');
			    opt.innerHTML = "All Categories";
			    opt.value = "All Categories";
			    opt.id=  "All Categories";
			    opt.selected= "selected";
			    sel.appendChild(opt);
			for(var i in data.category) {
			    var opt =document.createElement('option');
			    opt.innerHTML = data.category[i];
			    opt.value = data.category[i];
			    opt.id=  data.category[i];
			    sel.appendChild(opt);
			}
			
			var sbcats = document.getElementById('sbcats');
			var count=0;
				for(j=0;j<3;j++)
					{
					 var opt =document.createElement('tr');
					    opt.class="col-md-4";
					 sbcats.appendChild(opt);
					    
					    
					    for(k=0;k<3;k++)
						{
					    	 var td =document.createElement('td');
					    	
							 opt.appendChild(td);
							 var link =document.createElement('a');
						    td.appendChild(link);	
						    
							link.href="/getproducts?cat="+keys[count];
							link.innerHTML=keys[count];
							var ul =document.createElement('ul');
							td.appendChild(ul);
							console.log(data.category[keys[count]]);
							for(m in data.category[keys[count]])
								{
								var li =document.createElement('li');
								 var innerlink =document.createElement('a');
								innerlink.href="/getproducts?cat="+"\""+data.category[keys[count]][m]+"\"";
								innerlink.innerHTML=data.category[keys[count]][m];
								li.appendChild(innerlink);
								ul.appendChild(li);
								}
							
							count+=1;
							if(count==keys.length)
								{
								break;
								}
						}
					    if(count==keys.length)
						{
						break;
						}
					
			}
		}
		else
			{
		

			}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
	}).error(function(error) {
		
	});
	console.log(mainCategory)
	$http({
		method : "GET",
		url : '/getSubcats?cat='+mainCategory,
		data : {
			
		}
	}).success(function(data) {

		if (data.statusCode == 200) {
			var keys = Object.keys(data.category);
			console.log(keys);
			var sel = document.getElementById('cats');
			var shopbycatdiv = document.getElementById('shopbycat');
			for ( var i in keys) {
				var opt = document.createElement('li');
				var a=document.createElement('a');
				a.href="/getProducts?cat="+keys[i];
				a.innerHTML= keys[i];
				a.value = keys[i];
				a.id = keys[i];
				//opt.innerHTML = keys[i];
				opt.value = keys[i];
				opt.innerHTML = "<a href=\"/getProducts?cat="+keys[i]+"\">"+keys[i]+"</a>";
				opt.id = keys[i];
				sel.appendChild(opt);
				opt.appendChild(a);
				
				
				
				
				var opt2 = document.createElement('div');
				var thumbnail=document.createElement('a');
				thumbnail.href="portfolio-item.html";
				var img=document.createElement('img');
				img.src="http://placehold.it/700x450";
				img.class="img-responsive img-portfolio img-hover";
				thumbnail.appendChild(img);
				var a2=document.createElement('a');
				a2.href="/getProducts?cat="+keys[i];
				a2.innerHTML= keys[i];
				a2.value = keys[i];
				a2.id = keys[i];
				//opt.innerHTML = keys[i];
				opt2.className="col-md-4 col-sm-6"
				shopbycatdiv.appendChild(opt2);
				opt2.appendChild(thumbnail);
				opt2.appendChild(a);
			}
			var products = data.products;
			console.log("products.... "+products);
			
			var shopbyproductdiv = document.getElementById('shopbyproduct');

			for ( var i in products) {
				var opt = document.createElement('div');
				var thumbnail=document.createElement('a');
				thumbnail.href="/getItem?prod="+products[i];
				var img=document.createElement('img');
				img.src="http://placehold.it/700x450";
				img.class="img-responsive img-portfolio img-hover";
				thumbnail.appendChild(img);
				var a=document.createElement('a');
				a.href="/getItem?prod="+products[i];
				a.innerHTML= products[i];
				a.value = products[i];
				a.id = products[i];
				//opt.innerHTML = keys[i];
				opt.value = products[i];
				opt.className="col-md-4 col-sm-6"
				opt.id = products[i];
				shopbyproductdiv.appendChild(opt);
				opt.appendChild(thumbnail);
				opt.appendChild(a);
			}
		} else {

		}
		// Making a get call to the '/redirectToHomepage' API
		// window.location.assign("/homepage");
	}).error(function(error) {

	});
});