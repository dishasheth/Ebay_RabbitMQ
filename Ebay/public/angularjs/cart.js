var cart= angular.module('cart', []);

//defining the login controller
cart.controller('cart', function($scope,$location, $http) 
{
	
	
	$scope.quantity="";
	$scope.size=[];
	$scope.prod_id="";
	$scope.adding=false;
	console.log("in login" + "dfyjj");
	var s1 = $location.absUrl();
	var params = s1.split("?");
	$scope.total=0;
	
	$scope.fname="";
	$scope.itinerary=[];
	$scope.prodlist=[];
	
	if(!!params[1])
	{
		$scope.adding=true
	
console.log(params[1]);

var parValues = params[1].split("&&");
var prodarr=parValues[0];
prodarr=prodarr.split("=");
$scope.prod_id=prodarr[1];
var quantarr=parValues[1];
 quantarr=quantarr.replace("quantity=","");
$scope.quantity=quantarr;
var sizearr=parValues[2];
sizearr=sizearr.replace("size=","");;
$scope.size=sizearr;

	}

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
			   // sel.appendChild(opt);
			for(var i in data.category) {
				var currcat=data.category[i];
				var j=0;
				for(j in currcat)
			    var opt =document.createElement('option');
			    opt.innerHTML = currcat[j];
			    opt.value = currcat[j];
			    opt.id=  currcat[j];
			 //   sel.appendChild(opt);
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
					    	 td.style="margin-left:20px"
							 opt.appendChild(td);
							 var link =document.createElement('a');
						    td.appendChild(link);	
						    
							link.href="/getproducts?cat="+keys[count];
							link.innerHTML="<b>"+keys[count]+"</b>";
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
if($scope.adding)
{
	$http({
		method : "POST",
		url : '/addToCart',
		data : {
			"prod_id":$scope.prod_id,
			"quantity":$scope.quantity,
			"size":$scope.size
		
		}
	}).success(function(data) {

		console.log(JSON.stringify(data.category));//checking the response data for statusCode
		if (data.statusCode == 200) 
		{
			var pdetails=data.pdetails;
			console.log(pdetails);
			$scope.productsincart=pdetails;		
			for(i in pdetails)
				{
					$scope.total=$scope.total+(pdetails[i].cost*pdetails[i].quantity);
				}
		}
		
		else if (data.statusCode == 401) 
		{
			window.location='/login';
		}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
	}).error(function(error) {
		
	});


	
	}
else
{
	
	$http({
		method : "GET",
		url : '/showcart',
		data : {
			
		}
	}).success(function(data) {

		console.log(JSON.stringify(data.category));//checking the response data for statusCode
		if (data.statusCode == 200) 
		{
			var pdetails=data.pdetails;
			console.log(pdetails);
			$scope.productsincart=pdetails;		
			for(i in pdetails)
				{
					$scope.total=$scope.total+(pdetails[i].cost*pdetails[i].quantity);
				}
		}
		
		else if (data.statusCode == 401) 
		{
			window.location='/login';
		}
			//Making a get call to the '/redirectToHomepage' API
			//window.location.assign("/homepage"); 
	}).error(function(error) {
		
	});


}
$scope.checkout=function()
{
	window.location="/rendercheckout?direct=false";
}

});

var removefromcart=function(id)
{

			
			window.location="/removefromcart?id="+id;
		
}
