'use strict';
app.controller('bookingCtrl', ['$scope','$rootScope','$http','$location','$routeParams', 'loginService','sessionService','searchService', function($scope,$rootScope,$http,$location,$routeParams, loginService,sessionService,searchService){
	//logout
	$scope.searchParam = {};

	

	var load_type_request = $http.get('php/loadTypes.php');;
	load_type_request.then(function(response){
		$scope.load_types = response.data;
	});
	var vehicle_type_request = $http.get('php/vehicleTypes.php');;
	vehicle_type_request.then(function(response){
		$scope.vehicle_types = response.data;
	});
	$scope.searchParam = searchService.searchParam;
	var logIn_request = $http({
	    url: 'php/session.php', 
	    method: "GET",			    
	 });
	    logIn_request.then(function(response){
	    	$scope.islogged = response.data;
	});
	
	$scope.myBookings = function(type) {
	    //$http POST function
	    var surl = 'php/bookingCtrl.php?action=myBookings';
		if(!angular.isUndefined(type)){
			surl += '&type='+type
		}
	    $http({
	      method: 'POST',
	      url: surl,	      
	    }).then(function successCallback(response) {
	      $scope.myBookings = response.data;
	      
	    }, function errorCallback(response) {
	    	$("#getCode").html("Error. while created Post Try Again!");
			 	 	$("#getCodeModal").modal('show');
	      //alert("Error. while created Post Try Again!");
	    });
	};
	
	$scope.assign_load = function(id,status) {
		
		//$http POST function
		if(status=='0'){
			if(confirm('Are you Sure?')) {
				//alert('Reject'+id);
				$("#rejectModal").modal('show');
			}
		} else {
			alert('Accept');
			$http({
	      method: 'POST',
	      url: 'php/bookingCtrl.php?action=assign_load&bookingId='+id,	     
	    }).then(function successCallback(response) {
	      //alert(response);
	      var payment_id = response.data.payment_id;
	  	  if(payment_id !=''){
	  	  	Instamojo.open('https://test.instamojo.com/@sivakumar_sfdc'+'/'+payment_id);
	  	  } 
	      
	    }, function errorCallback(response) {
	      //alert("Error. while created Post Try Again!");
	      $("#getCode").html("Error. while created Post Try Again!");
		  $("#getCodeModal").modal('show');
	    });
		}
	    
		
	}

	$scope.loadSearch = function() {
		if($scope.islogged == '1'){
				//alert('login');
				 $location.path('/Search');
		}
		else{
				 searchService.searchParam = $scope.searchParam;
				 $location.path('/SignIn/loginMsg');
		}
	};

}]);

