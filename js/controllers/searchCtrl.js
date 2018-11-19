'use strict';

app.controller('searchCtrl', ['$scope','$rootScope','$http', 'loginService','sessionService', function($scope,$rootScope,$http, loginService,sessionService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
	var load_type_request = $http.get('php/loadTypes.php');;
	load_type_request.then(function(response){
		$scope.load_types = response.data;
	});
	var vehicle_type_request = $http.get('php/vehicleTypes.php');;
	vehicle_type_request.then(function(response){
		$scope.vehicle_types = response.data;
	});
	$scope.load = {'search_type':'load'};
	var logIn_request = $http({
	    url: 'php/session.php', 
	    method: "GET",			    
	 });
	    logIn_request.then(function(response){
	    	$scope.islogged = response.data;
	});
	
	$scope.loadSearch = function() {
		if($scope.islogged == '1'){
				alert('login');
		}
		else{
				alert('nologin');
		}
	};

}]);

