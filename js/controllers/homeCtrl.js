'use strict';

app.controller('homeCtrl', ['$scope','$rootScope','$http', 'loginService', function($scope,$rootScope,$http, loginService){
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
	//fetch login user
	/*var userrequest = loginService.fetchuser();
	userrequest.then(function(response){
		$scope.user = response.data[0];
	});*/

}]);

