var productdetails= angular.module('productdetails', []);

//defining the login controller
productdetails.controller('productdetails', function($scope,$location, $http) {
	$scope.condition="";
	$scope.quantity="";
	$scope.name="";
	$scope.size=[];
	$scope.prodimage="";
	$scope.price="";
	$scope.prod_id="";
	$scope.selectedsize="s";
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
		url : '/getItemDetails?prod='+mainCategory,
		data : {
			
		}
	}).success(function(data) {

		console.log(JSON.stringify(data));//checking the response data for statusCode
		if (data.statusCode === 200) 
		{
			var pdetails=data.pdetails;
			console.log(pdetails);
					$scope.condition=pdetails["condition"];
					$scope.quantity=pdetails["quantity"];
					$scope.name=pdetails["name"];
					$scope.size=pdetails["size"].split(',');
					$scope.prodimage=pdetails["image"];
					$scope.price=pdetails["cost"];
					$scope.prod_id=pdetails["prod_id"];
					console.log("PRODUCT ID :"+$scope.prod_id);
		}
		
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
	}).error(function(error) {
		
	});
	


	$scope.addtocart=function()
	{
		
		window.location="/rendercart?prod_id="+$scope.prod_id+"&&quantity="+$scope.quantity+"&&size="+$scope.selectedsize;
		
	}
	$scope.buynow=function ()
	{
		
		window.location="/rendercheckout?direct="+true+"&&prod_id="+$scope.prod_id+"&&quantity="+$scope.quantity+"&&size="+$scope.selectedsize;
	}
});