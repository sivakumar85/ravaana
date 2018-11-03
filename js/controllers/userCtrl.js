'use strict';

app.controller('userCtrl', ['$scope','$http', 'loginService', function($scope,$http, loginService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
	$scope.profile_pic = 'images/user.png';
	//alert(login_username);
	$scope.login_username =  login_username;
	var userrequest = $http.get('php/fetchUserProfile.php');
		userrequest.then(function(response){
			$scope.userProfile = response.data[0];
			if(!angular.isUndefined($scope.userProfile.profile_pic)){
				$scope.profile_pic = 'php/upload/'+$scope.userProfile.profile_pic;
			} 
		});
	
	
	

}]);


app.controller('branchListCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
	
	$scope.displayBranchList = function(){
	var branchList_request = $http.get('php/fetchBranchList.php?action=getBranchList');
	branchList_request.then(function(response){
		$scope.branchList = response.data;
	});
	}

	$scope.searchBranch = function() {
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/fetchBranchList.php?action=getBranchList',
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.branchList = response.data;
	      
	    }, function errorCallback(response) {
	      alert("Error. fetch Try Again!");
	    });
	  };
	$scope.resetSearch = function() {
		//$location.path( '/MyLoads' );
		$scope.searchParam = {};
		$scope.searchBranch();
	};
	
	$scope.deleteBranch = function(id){  
           if(confirm("Are you sure you want to delete the branch?"))  
           {  
                $http.post("php/fetchBranchList.php?action=deleteBranch", {'id':id})  
                .success(function(response){  
                	 alert(response.message);
                     $scope.displayBranchList();
                });  
           }  
           else  
           {  
                return false;  
           }  
     }
      $scope.updateBranchStatus = function(branch){  
      	$http.post("php/fetchBranchList.php?action=updateBranchStatus", {'id':branch.id,'active':branch.active})  
                .success(function(response){  
                	 alert(response.message);
                     $scope.displayBranchList();
                }); 
      }

      $scope.editBranch = function() {
		if(!angular.isUndefined($routeParams.id)){
			var branch_request = $http({
			    url: 'php/fetchBranchList.php?action=getBranchList', 
			    method: "GET",
			    params: {id: $routeParams.id}
			 });
		    branch_request.then(function(response){
			$scope.branch = response.data[0];
		});
			
		}
	}

	$scope.cancelBranch = function() {
		$location.path( '/Branches' );
		
	};

	$scope.updateBranch = function($event) {
	  	$event.preventDefault();
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/fetchBranchList.php?action=updateBranch',
	      data: $scope.branch
	    }).then(function successCallback(response) {
	      //$scope.users.push(response.data);
	      alert(response.data.message);
	      
	      /*$('.modal-body').load("Post  created Successfully",function(){
            $('#myModal').modal({show:true});
          });*/
	      $location.path( '/Branches' );
	    }, function errorCallback(response) {
	      alert("Error. while created Post Try Again!");
	    });
	  };
	  

}]);
