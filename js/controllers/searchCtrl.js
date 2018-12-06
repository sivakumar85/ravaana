'use strict';
app.service('searchService', function(){
  this.searchParam = {'search_type':'load'};
});
app.controller('searchCtrl', ['$scope','$rootScope','$http','$location', 'loginService','sessionService','searchService', function($scope,$rootScope,$http,$location, loginService,sessionService,searchService){
	//logout
	$scope.searchParam = {};

	$scope.selection=[];
	$scope.pay = 0;
	// toggle selection for a given employee by name
	$scope.toggleSelection = function toggleSelection(truckid) {
    var idx = $scope.selection.indexOf(truckid);

    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.selection.push(truckid);
    }
  };

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

	$scope.search = function(type) {
	    //$http POST function
	    var surl = 'php/searchCtrl.php?action=search';
		/*if(!angular.isUndefined(type)){
			surl += '?type=past'
		}*/
	    $http({
	      method: 'POST',
	      url: surl,
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.searchData = response.data;
	      
	    }, function errorCallback(response) {
	    	$("#getCode").html("Error. while created Post Try Again!");
			 	 	$("#getCodeModal").modal('show');
	      //alert("Error. while created Post Try Again!");
	    });
	};
	
	$scope.selectTruck = function(type) {
	    //$http POST function
	    var surl = 'php/searchCtrl.php?action=getTrucksList';
		$http({
	      method: 'POST',
	      url: surl,
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      	$scope.trucksList = response.data;
	      	var driversList_request = $http.get('php/driversCtrl.php?action=getDriversList');
			driversList_request.then(function(response){
				$scope.driversList = response.data;
			});
	      
	    }, function errorCallback(response) {
	    	$("#getCode").html("Error. while created Post Try Again!");
			 	 	$("#getCodeModal").modal('show');
	      //alert("Error. while created Post Try Again!");
	    });
	};

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

