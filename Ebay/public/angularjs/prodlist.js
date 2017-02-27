/**
 * New node file
 */
var login=angular.module('sessioncheck',[]);

login.controller('sessioncheck',function($scope,$http,$location)
		{
	
	$scope.ids=[];
	$scope.pname=[];
	$scope.cost=[];
	var s1 = $location.absUrl();
	var params = s1.split("?");
	console.log(params[1]);
	
	var parValues = params[1].split("&&");
	var pname2=parValues[0];
	pname2=pname2.replace("pname=","");
	$scope.pname2=pname2;
	var pcat=parValues[1];
	pcat=pcat.replace("pcat=","");
	$scope.pcat=pcat;
	
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
		
	/*	$http({
			method : "POST",
			url : '/productlist',
			data : {
				
				"pname":$scope.searchbar,
				"pcat":$scope.cat
			}
		
		}).success(function(data) {
			//checking the response data for statusCode
				console.log("in success for prod items");
				
				if(data.statusCode===200){
				for(var i=0;i<data.results.length;i++)	{
				var ids=[];
				var pname=[];
				var cost=[];

					console.log("valid Login in angular"+data.results[i].prod_id);
					ids.push(data.results[i].prod_id);	
					pname.push(data.results[i].prod_name);
					cost.push(data.results[i].prod_cost);*/
					/*var shopbyproductdiv = document.getElementById('shopbyproduct');
					if(shopbyproductdiv!=null){
					var opt = document.createElement('div');
					var thumbnail=document.createElement('a');
					thumbnail.href="/getItem?prod="+data.results[i].prod_name;
					var a=document.createElement('a');
					a.href="/getItem?prod="+data.results[i].prod_name;
					a.innerHTML= data.results[i].prod_name;
					a.value = data.results[i].prod_name;
					a.id = data.results[i].prod_name;
					//opt.innerHTML = keys[i];
					opt.className="col-md-4"
					opt.id = data.results[i].prod_name;
					shopbyproductdiv.appendChild(opt);
					opt.appendChild(thumbnail);
					opt.appendChild(a);
					}*/
					
				//	}
				
				window.location="/prodlist?pname="+$scope.searchbar+"&&pcat="+$scope.cat;
				/*}
				
				else
				{
				console.log("status 401 angular");
				}
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		).error(function(error) {
			console.log("in error2");
		});*/
	};
	
	
$http({
			method : "POST",
			url : '/productlist',
			data : {
				
				"pname":$scope.pname2,
				"pcat":$scope.pcat
			}
		
		}).success(function(data) {
			//checking the response data for statusCode
			console.log("in success for prod items0");
				console.log(data);
				if(data.statusCode===200){
					console.log("in success for prod items1");
				for(var i=0;i<data.results.length;i++)	{
					console.log("in success for prod items2");

					console.log("valid Login in angular"+data.results[i]._id);
					$scope.ids.push(data.results[i]);	
					$scope.pname.push(data.results[i].prod_name);
					$scope.cost.push(data.results[i].prod_cost);
					console.log($scope.ids);
					
					
					}
				
				}
				
				else
				{
				console.log("status 401 angular");
				}
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		).error(function(error) {
			console.log("in error2");
		});
$scope.proddetails=function(){
	console.log($scope.moreinfo.value);
}

		});