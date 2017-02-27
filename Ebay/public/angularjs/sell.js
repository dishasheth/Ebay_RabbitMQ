/**
 * New node file
 */
/**
 * http://usejsdoc.org/
 */
var login=angular.module('sell',[]);

login.controller('sell',function($scope,$http,$window)
		{
	
	$scope.auction=false;
	$scope.fixed=true;
	$scope.itinerary=[];
	
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
	
	
	$scope.submit = function() {
	
		
	//	$window.alert("in");
		$http({
			method : "GET",
			url : '/addprod',
			data : {
				"user" : $scope.username,
				"pass": $scope.password
			}
		
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode=== 200) {
				
				$window.location.assign("/");
			}
			else
				{
				
				$scope.invalid_login=false;
				
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
		});
	};
	
	$scope.onauction=function(){
		$scope.auction=false;
		$scope.fixed=true;
	};
	$scope.onfixed=function(){
		$scope.auction=true;
		$scope.fixed=false;
	};
	
	
	$scope.addprod = function() {
		
		$http({
			method : "POST",
			url : '/addProduct',
			data : {
			"title":$scope.title,
			"condition":$scope.condition,
			"brand":$scope.brand,
			"details":$scope.details,
			"category":$scope.category,
			"starting":$scope.starting,
			"price":$scope.price,
			"quantity":$scope.quantity,
			"auction":$scope.auction,
			"fixed":$scope.fixed,
			"size":$scope.size
			}
		
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode=== 200) {
				$window.alert("Product added");
				$window.location.assign("/");
			}
			else
				{
				
				}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
			
		});
	};
	
});