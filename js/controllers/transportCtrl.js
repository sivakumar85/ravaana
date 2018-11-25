app.controller('PostingLoadsCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
	$scope.errorMsg = '';
	$scope.errorPost = false;
	var load_type_request = $http.get('php/loadTypes.php');;
	load_type_request.then(function(response){
		$scope.load_types = response.data;
	});
	var vehicle_type_request = $http.get('php/vehicleTypes.php');;
	vehicle_type_request.then(function(response){
		$scope.vehicle_types = response.data;
	});
	var branch_request = $http.get('php/branchList.php');;
	branch_request.then(function(response){
		$scope.branches = response.data;
	});
	$scope.editPost = function() {
		$scope.load = {available_date_from:'',available_date_to:''};
		if(!angular.isUndefined($routeParams.id)){
			var my_load_request = $http({
			    url: 'php/fetchMyLoads.php', 
			    method: "GET",
			    params: {id: $routeParams.id}
			 });
		    my_load_request.then(function(response){
			$scope.load = response.data[0];
		});
			
		}
	}

	$scope.cancelPost = function() {
		$location.path( '/MyLoads' );
		
	};
	//Post a Load
	  $scope.postLoad = function($event) {
	  	$event.preventDefault();
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/postLoad.php',
	      data: $scope.load
	    }).then(function successCallback(response) {
	      //$scope.users.push(response.data);
	      //alert(response.data.message);
	      /*$('.modal-body').load("Post  created Successfully",function(){
            $('#myModal').modal({show:true});
          });*/
	          if(response.data.message!='') {
	       		 $("#getCode").html(response.data.message);
				 $("#getCodeModal").modal('show');
		     	 $location.path( '/MyLoads' );
	          }
	          else if(response.data.error!='') {
	          	$scope.errorPost = true;
	          	$scope.errorMsg = response.data.error;
	          	//$("#getCode").html(response.data.error);
				//$("#getCodeModal").modal('show');
		     	
	          }
	         
	    }, function errorCallback(response) {
	    	$("#getCode").html("Error. while created Post Try Again!");
			 	 	$("#getCodeModal").modal('show');
	      //alert("Error. while created Post Try Again!");
	    });
	  };

}]);

app.controller('MyLoadsCtrl', ['$scope','$http','$location', function($scope, $http,$location){
	
	$scope.displayPosts = function(type){
		var url = 'php/fetchMyLoads.php';
		if(!angular.isUndefined(type)){
			url += '?type=past'
		}
	var my_load_request = $http.get(url);
	my_load_request.then(function(response){
		$scope.myloads = response.data;
	});
	}

	$scope.searchPosts = function(type) {
	    //$http POST function
	    var surl = 'php/fetchMyLoads.php';
		if(!angular.isUndefined(type)){
			surl += '?type=past'
		}
	    $http({
	      method: 'POST',
	      url: surl,
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.myloads = response.data;
	      
	    }, function errorCallback(response) {
	    	$("#getCode").html("Error. while created Post Try Again!");
			 	 	$("#getCodeModal").modal('show');
	      //alert("Error. while created Post Try Again!");
	    });
	  };
	$scope.resetSearch = function(type) {
		//$location.path( '/MyLoads' );
		$scope.searchParam = {};
		$scope.searchPosts(type);
	};
	var load_type_request = $http.get('php/loadTypes.php');;
	load_type_request.then(function(response){
		$scope.load_types = response.data;
	});

	$scope.deletePost = function(id){  
           if(confirm("Are you sure you want to close the Post?"))  
           {  
                $http.post("php/deletePost.php", {'id':id})  
                .success(function(response){  
                	 //alert(response.message);
                	$("#getCode").html(response.message);
			 	 	$("#getCodeModal").modal('show');
                     $scope.displayPosts();
                });  
           }  
           else  
           {  
                return false;  
           }  
     }
      $scope.updatePostStatus = function(myload){  
      	$http.post("php/updatePostStatus.php", {'id':myload.id,'active':myload.active})  
                .success(function(response){  
                	// alert(response.message);
                	$("#getCode").html(response.message);
			 	 	$("#getCodeModal").modal('show');
                     $scope.displayPosts();
                }); 
      }
	  

}]);

