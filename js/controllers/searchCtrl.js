'use strict';
app.service('searchService', function(){
  this.searchParam = {'search_type':'load'};
});
app.controller('searchCtrl', ['$scope','$rootScope','$http','$location', 'loginService','sessionService','searchService', function($scope,$rootScope,$http,$location, loginService,sessionService,searchService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
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

