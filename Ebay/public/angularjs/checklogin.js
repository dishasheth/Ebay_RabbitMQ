/**
 * http://usejsdoc.org/
 */
var login=angular.module('login',['ngStorage']);

login.controller('mylogin',function($scope,$http,$window,$localStorage)
		{
	$window.alert("in");
	$scope.invalid_login=true;
	$scope.lastlogin="";
	//$scope.itinerary=[];
	$scope.submit = function() {
		
		
		//	$window.alert("in");
			$http({
				method : "POST",
				url : '/signin',
				data : {
					"user" : $scope.username,
					"pass": $scope.password
				}
			
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode=== 200) {
					if (typeof(Storage) !== "undefined") {
						window.localStorage.setItem("lastlogintime",new Date());
					} else {
					    // Sorry! No Web Storage support..
					}
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
		
	
	$scope.register = function() {
		$window.alert("in");
		$http({
			method : "POST",
			url : '/signup',
			data : {
				"email" : $scope.email,
				"pass": $scope.password,
				"fname":$scope.fname,
				"lname":$scope.lname,
				"phn":$scope.phn
			}
		
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode===200) {
				$localStorage.lastlogin=new Date();
				$window.location.assign("/login");
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