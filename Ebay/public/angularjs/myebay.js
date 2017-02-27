/**
 * New node file
 */
/**
 * New node file
 */
var login=angular.module('myebay',[]);

login.controller('myebay',function($scope,$http,$window)
		{
	$scope.fname="";
	$scope.lname="";
	$scope.email="";
	$scope.mobile="";
	$scope.handle="";
	$scope.sell=[];
	$scope.purchase=[];
	
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
				$scope.lname=data.lastname;
				$scope.email=data.email;
				$scope.mobile=data.mobile;
				$scope.handle=data.handle;
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
		url : '/getpurchase',
		data : {
			
		}}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode=== 200) {
			for(i=0;i<data.resultsofpurchase.length;i++){	
			console.log(data.resultsofpurchase[i]);
			$scope.purchase.push(data.resultsofpurchase[i]);
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
		url : '/getsell',
		data : {
			
		}}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode=== 200) {
				for(i=0;i<data.resultsofsell.length;i++){
			console.log(data.resultsofsell[i]);
				$scope.sell.push(data.resultsofsell[i]); }
			}
			else
				{
			
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
		
		});
	
		});