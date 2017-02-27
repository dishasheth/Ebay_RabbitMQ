var checkout= angular.module('final', []);

//defining the login controller
checkout.controller('final', function($scope,$location, $http) 
{
	$scope.disablecheckout=true;
	$scope.hidepayment=true;
	$scope.disablebutton=true;
	$scope.quantity="";
	$scope.size=[];
	$scope.prod_id="";
	$scope.total=0;
	$scope.err_payment=true;
	$scope.invalid_quantity=true
	console.log("in login" + "dfyjj");
	var s1 = $location.absUrl();
	var params = s1.split("?");
	console.log(params[1]);
	
	var parValues = params[1].split("&&");
	var dirdarr=parValues[0];
	dirdarr=dirdarr.replace("direct=","");
	$scope.direct=dirdarr;
	if($scope.direct=="true")
		{
		var prodarr=parValues[1];
		prodarr=prodarr.split("=");
		$scope.prod_id=prodarr[1];
		var quantarr=parValues[2];
		 quantarr=quantarr.replace("quantity=","");
		$scope.quantity=quantarr;
		var sizearr=parValues[3];
		sizearr=sizearr.replace("size=","");;
		$scope.size=sizearr;
		$scope.total=0;
		}
	
	
$http({
			method : "POST",
			url : '/checkout',
			data : {
				direct:$scope.direct,
				prod_id:$scope.prod_id,
				size:$scope.size,
				quantity:$scope.quantity
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
						$scope.total=$scope.total+pdetails[i].cost*pdetails[i].quantity;
					}
				$scope.address=[];
				$scope.address=data.address.split(',');
			}
			
			else if (data.statusCode == 401) 
			{
				window.location='/login';
			}
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
			
		});
$scope.checkout=function(total)
{
	wondow.location="/rendercheckout?from=cart";
}
$scope.showpyment=function()
{
	if($scope.hidepayment==true)
		{
		$scope.hidepayment=false;
		}
	else
		{
		$scope.hidepayment=true;
		}
	
	}


$scope.paymentdetails=function()
{
	
	var cardno=$scope.cardno;
	var expdate=$scope.expdate;
	var fname=$scope.fname;
	var lname=$scope.lname;
	var ssn=$scope.ssn;
	
	var d=new Date(expdate);
	var valid=true;
	if(cardno.length!=16)
		{
		$scope.err_payment=false;
		}
	if(new Date().getTime()>d.getTime())
	{
		$scope.err_payment=false;
		
	}
	if(fname.length<1)
	{
		
		$scope.err_payment=false;
		
	}
	if(lname.length<1)
	{
		
		$scope.err_payment=false;
		
	}
	$scope.err_payment=true;
		$scope.disablecheckout=false;

}
$scope.pay=function()
{
	
	$http({
				method : "POST",
				url : '/pay',
				data : {
					direct:$scope.direct,
					prod_id:$scope.prod_id,
					size:$scope.size,
					quantity:$scope.quantity
				}
			}).success(function(data) {

				console.log(JSON.stringify(data.category));//checking the response data for statusCode
				if (data.statusCode == 200) 
				{
					window.location='/';
				}
				
				else if (data.statusCode == 401) 
				{
					window.location='/login';
				}
				else if (data.statusCode == 402) 
				{
					$scope.invalid_quantity=false;
				}
					//Making a get call to the '/redirectToHomepage' API
					//window.location.assign("/homepage"); 
			}).error(function(error) {
				
			});	
}

});