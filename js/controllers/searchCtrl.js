'use strict';
app.service('searchService', function(){
  this.searchParam = {'search_type':'load'};
});
app.controller('searchCtrl', ['$scope','$rootScope','$http','$location','$routeParams', 'loginService','sessionService','searchService', function($scope,$rootScope,$http,$location,$routeParams, loginService,sessionService,searchService){
	//logout
	$scope.searchParam = {};
	$scope.business_type = sessionService.get('business_type');
	$scope.truckIds=[];
	$scope.driverIds =[] ;
	$scope.pay = 0;
	// toggle selection for a given employee by name
	$scope.toggleSelection = function toggleSelection(truckid) {
    var idx = $scope.truckIds.indexOf(truckid);

    // is currently selected
    if (idx > -1) {
      $scope.truckIds.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.truckIds.push(truckid);
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
	/*var logIn_request = $http({
	    url: 'php/session.php', 
	    method: "GET",			    
	 });
	    logIn_request.then(function(response){
	    	$scope.islogged = response.data;
	});*/
	$scope.islogged = 0;
	if($scope.business_type!=null) {
		$scope.islogged = 1;
	} 
	$scope.makePayment = function() {
		//alert($scope.driverIds+'--'+$scope.truckIds);
		var truckDriverArray = [];
		var truckDriverObj = {};
		var driversArray = [];
		for(var j = 0; j < $scope.driverIds.length; j++) {
			if($scope.driverIds[j]!='' && $scope.driverIds[j]!=null){
				driversArray.push($scope.driverIds[j]);
			}
		}
		if(!angular.isUndefined($routeParams.loadId)) {
			$scope.loadId = $routeParams.loadId;
		}
		//alert(driversArray);
		for(var i = 0; i < $scope.truckIds.length; i++)
		{
			truckDriverObj = {};
			truckDriverObj.driverId = driversArray[i];
			truckDriverObj.truckId = $scope.truckIds[i];
			truckDriverObj.loadId = $scope.loadId;
			truckDriverArray.push(truckDriverObj);
		}
		console.log(truckDriverArray);
		//$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/searchCtrl.php?action=createLoadRequest',
	      data: truckDriverArray
	    }).then(function successCallback(response) {
	      //alert(response);
	      var payment_id = response.data.payment_id;
	      Instamojo.open('https://test.instamojo.com/@sivakumar_sfdc'+'/'+payment_id);
	    }, function errorCallback(response) {
	      //alert("Error. while created Post Try Again!");
	      $("#getCode").html("Error. while created Post Try Again!");
		  $("#getCodeModal").modal('show');
	    });
		
	}
	$scope.resetSearch = function() {
		//$location.path( '/MyLoads' );
		$scope.searchParam = {'search_type':'load'};
		$scope.search();
	};
	$scope.search = function(type) {
	    //$http POST function
	    var surl = 'php/searchCtrl.php?action=search';
		/*if(!angular.isUndefined(type)){
			surl += '?type=past'
		}*/
		//alert($scope.searchParam);
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
	$scope.viewLoads = function(){
		$('#viewloads').modal({show:true});
	}
	$scope.viewdetails = function(){
		$('#viewdetails').modal({show:true});
	}
	
	$scope.loadSearch = function() {
		if($scope.islogged == '1'){
				//alert('login');
				//alert( $scope.searchParam.search_type);
				if($scope.searchParam.search_type == 'load') {
					$location.path('/Search');
				} else if($scope.searchParam.search_type == 'truck') {
					$location.path('/booktruck');
				} 
		}
		else{
				 searchService.searchParam = $scope.searchParam;
				 $location.path('/SignIn/loginMsg');
		}
	};
	$scope.sort = {       
					sortingOrder : 'typeOfLoad',
					reverse : false
				};

}]);
app.directive("userloadSort", function() {
		return {
			restrict: 'A',
			transclude: true,    
			scope: {
			  order: '=',
			  sort: '='
			},
			template : 
			  ' <a href="javascript:void(0);" ng-click="sort_by(order)" style="color: #555555;">'+
			  '    <span ng-transclude></span>'+
			  '    <i ng-class="selectedCls(order)"></i>'+
			  '</a>',
			link: function(scope) {
						
			// change sorting order
			scope.sort_by = function(newSortingOrder) {       
				var sort = scope.sort;
				
				if (sort.sortingOrder == newSortingOrder){
					sort.reverse = !sort.reverse;
				}                    

				sort.sortingOrder = newSortingOrder;        
			};
			
		   
			scope.selectedCls = function(column) {
				if(column == scope.sort.sortingOrder){
					return ('fa fa-sort-' + ((scope.sort.reverse) ? 'desc' : 'asc'));
				}
				else{            
					return'fa fa-sort' 
				} 
			};      
		  }
		}

	});



