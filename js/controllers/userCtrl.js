'use strict';

app.controller('userCtrl', ['$scope','$rootScope','$http', 'loginService', function($scope,$rootScope,$http, loginService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
	$rootScope.$on("CalluserCtrlMethod", function(){
           $scope.userProfileMethod();
           // $location.path( '/TransportCompanyProfile' );
        });

        $scope.userProfileMethod = function() {
            var userrequest = $http.get('php/profileCtrl.php?action=fetchProfile');
			userrequest.then(function(response){
				if(response.data.length>0) {
					$scope.userProfile = response.data[0];
					$scope.profile_name = $scope.userProfile.business_type;
					if ($scope.profile_name == 'TransportCompany') {
						$scope.login_username = $scope.userProfile.company_name
					} else {
						$scope.login_username = $scope.userProfile.name
					}
					
					if(!angular.isUndefined($scope.userProfile.profile_pic)){
						$scope.profile_pic = 'php/upload/'+$scope.userProfile.profile_pic;

					} 
				}
				
		});
        }
	$scope.profile_pic = 'images/user.png';
	//alert(login_username);
	$scope.login_username =  login_username;
	$scope.profile_name =  profile_name;
	$scope.userProfileMethod();
	
	

}]);


app.controller('branchListCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
	
	$scope.displayBranchList = function(){
	var branchList_request = $http.get('php/fetchBranchList.php?action=getBranchList');
	branchList_request.then(function(response){
		$scope.branchList = response.data;
	});
	}
	$scope.sort = {       
					sortingOrder : 'name',
					reverse : true
				};
	$scope.editbranch = function(id){
        $location.path("/addBranch/"+id);
        $('#branchModal').modal('hide');
    }
	$scope.viewbranch = function(branch){
			$scope.branch = branch;
			$('#branchModal').modal('show');
		};

	$scope.searchBranch = function() {
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/fetchBranchList.php?action=getBranchList',
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.branchList = response.data;
	      
	    }, function errorCallback(response) {
	      //alert("Error. fetch Try Again!");
	      $("#getCode").html("Error. fetch Try Again!");
		  $("#getCodeModal").modal('show');
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
                	// alert(response.message);
                	 $("#getCode").html(response.message);
		  		 	 $("#getCodeModal").modal('show');
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
                	 //alert(response.message);
                	 $("#getCode").html(response.message);
		  		 	 $("#getCodeModal").modal('show');
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
	      //alert(response.data.message);
	      $("#getCode").html(response.data.message);
		  $("#getCodeModal").modal('show');
	      /*$('.modal-body').load("Post  created Successfully",function(){
            $('#myModal').modal({show:true});
          });*/
	      $location.path( '/Branches' );
	    }, function errorCallback(response) {
	      //alert("Error. while created Post Try Again!");
	      $("#getCode").html("Error. while created Post Try Again!");
		  $("#getCodeModal").modal('show');
	    });
	  };
	  

}]);

app.controller('driversCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
	$scope.form=[];
    $scope.files=[];
    $scope.editLicence = false;
    $scope.editPhoto = false;
    $scope.editAadhar = false;
    $scope.edit = false;
	$scope.displayDriversList = function(){
	var driversList_request = $http.get('php/driversCtrl.php?action=getDriversList');
	driversList_request.then(function(response){
		$scope.driversList = response.data;
	});
	}
	 $scope.editdriver = function(id){
        $location.path("/AddDriver/"+id);
        $('#driverModal').modal('hide');
    }
	$scope.viewdriver = function(driver){
			$scope.driver = driver;
			$('#driverModal').modal('show');
		};
	$scope.sort = {       
					sortingOrder : 'driver_name',
					reverse : true
				};
	$scope.searchDrivers = function() {
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/driversCtrl.php?action=getDriversList',
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.driversList = response.data;
	      
	    }, function errorCallback(response) {
	      //alert("Error. fetch Try Again!");
	      $("#getCode").html("Error. fetch Try Again!");
		  $("#getCodeModal").modal('show');
	    });
	  };
	$scope.resetSearch = function() {
		//$location.path( '/MyLoads' );
		$scope.searchParam = {};
		$scope.searchDrivers();
	};
	
	$scope.deleteDriver = function(id){  
       if(confirm("Are you sure you want to delete the driver?"))  
       {  
            $http.post("php/driversCtrl.php?action=deleteDriver", {'id':id})  
            .success(function(response){  
            	 //alert(response.message);
            	 $("#getCode").html(response.message);
		  		 $("#getCodeModal").modal('show');
                 $scope.displayDriversList();
            });  
       }  
       else  
       {  
            return false;  
       }  
     }
      $scope.updateDriverStatus = function(driver){  
      	$http.post("php/driversCtrl.php?action=updateDriverStatus", {'id':driver.id,'active':driver.active})  
                .success(function(response){  
                	 //alert(response.message);
                	 $("#getCode").html(response.message);
		  		 	 $("#getCodeModal").modal('show');
                     $scope.displayDriversList();
                }); 
      }

      $scope.editDriver = function() {
		if(!angular.isUndefined($routeParams.id)){

			var driver_request = $http({
			    url: 'php/driversCtrl.php?action=getDriversList', 
			    method: "GET",
			    params: {id: $routeParams.id}
			 });
		    driver_request.then(function(response){
			$scope.driver = response.data[0];
			$scope.editLicence = true;
    		$scope.editPhoto = true;
    		$scope.editAadhar = true;
    		 $scope.edit = true;
		});
			
		}
	}

	$scope.cancelDriver = function() {
		$location.path( '/Drivers' );
		
	};
	 

	$scope.updateDriver=function($event){
		$event.preventDefault();
		if(!angular.isUndefined($scope.files)){
			$scope.image1=$scope.files[0];
		}
		if(!angular.isUndefined($scope.files2)){
			$scope.image2=$scope.files2[0];
		}
		if(!angular.isUndefined($scope.files3)){
			$scope.image3=$scope.files3[0];
		}
			
			
			
			
			
			$http({
				method:'POST',
				url:"php/driversCtrl.php?action=updateDriver",
				processData:false,
				transformRequest:function(data){
					var formData=new FormData();
					formData.append("model", angular.toJson($scope.driver));
					if(!angular.isUndefined($scope.image1)){
						formData.append("image1", $scope.image1);
					}
					if(!angular.isUndefined($scope.image2)){
						formData.append("image2", $scope.image2);
					}
					if(!angular.isUndefined($scope.image3)){
						formData.append("image3", $scope.image3);
					}
					
					
					


			      return formData;
			      
			  },  
			  data: $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   }).success(function(data){
		        //alert(data.message);
		        $("#getCode").html(data.message);
		  		 $("#getCodeModal").modal('show');
		        $location.path( '/Drivers' );

		        
		   });
		   
			};

		$scope.uploadedFile=function(element)
			{
				$scope.currentFile = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	//var output = document.getElementById('output');
    			//output.src = URL.createObjectURL(element.files[0]);
				//output.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }


		  $scope.uploadedFile2=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	//var output1 = document.getElementById('output1');
    			//output1.src = URL.createObjectURL(element.files[0]);
    			//output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files2 = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }
		  $scope.uploadedFile3=function(element)
			{
				$scope.currentFile3 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	//var output1 = document.getElementById('output1');
    			//output1.src = URL.createObjectURL(element.files[0]);
    			//output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files3 = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }
}]);
app.directive("driverSort", function() {
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
		  }// end link
		}
	});