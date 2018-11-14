app.controller('trucksCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
	$scope.form=[];
    $scope.files=[];
    $scope.editRC = false;
    $scope.editInsurance = false;
    $scope.editPollution = false;
    $scope.editImage = false;
    $scope.editFC = false;
    $scope.edit = false;

    $scope.errorProfile = false;
	//fetch login user Profile
	if(!angular.isUndefined($routeParams.pSucess)){
		$rootScope.$emit("CalluserCtrlMethod", {});
	}
	$scope.fetch = function(){
		var userrequest = $http.get('php/fetch.php');
		userrequest.then(function(response){
			$scope.user = response.data[0];
		});
	}

	$scope.fetchProfile = function(){
		var userrequest = $http.get('php/fetchUserProfile.php');
		userrequest.then(function(response){
			$scope.user = response.data[0];
		});
		
	}

	$scope.cancelUpdate = function() {
		window.location.reload();
	};
	$scope.clearMsg = function(){
		$scope.errorProfile = false;
	}
    
    var vehicle_type_request = $http.get('php/vehicleTypes.php');
	vehicle_type_request.then(function(response){
		$scope.vehicle_types = response.data;
	});
	$scope.displayTrucksList = function(){
	var trucksList_request = $http.get('php/trucksCtrl.php?action=getTrucksList');
	trucksList_request.then(function(response){
		$scope.trucksList = response.data;
	});
	}

	$scope.searchTrucks = function() {
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/trucksCtrl.php?action=getTrucksList',
	      data: $scope.searchParam
	    }).then(function successCallback(response) {
	      $scope.trucksList = response.data;
	      
	    }, function errorCallback(response) {
	      //alert("Error. fetch Try Again!");
	      $("#getCode").html("Error. fetch Try Again!");
		  $("#getCodeModal").modal('show');
	    });
	  };
	$scope.resetSearch = function() {
		//$location.path( '/MyLoads' );
		$scope.searchParam = {};
		$scope.searchTrucks();
	};
	
	$scope.deleteTruck = function(id){  
       if(confirm("Are you sure you want to delete the Truck?"))  
       {  
            $http.post("php/trucksCtrl.php?action=deleteTruck", {'id':id})  
            .success(function(response){  
            	// alert(response.message);
            	 $("#getCode").html(response.message);
		  		 $("#getCodeModal").modal('show');
                 $scope.displayTrucksList();
            });  
       }  
       else  
       {  
            return false;  
       }  
     }
      $scope.updateTruckStatus = function(Truck){  
      	$http.post("php/trucksCtrl.php?action=updateTruckStatus", {'id':Truck.id,'active':Truck.active})  
                .success(function(response){  
                	 //alert(response.message);
                	 $("#getCode").html(response.message);
		  			 $("#getCodeModal").modal('show');
                     $scope.displayTrucksList();
                }); 
      }

    $scope.getCapacity = function (truck) {
        var vehicle_type_id = $scope.truck.vehicle_type;
        if(!angular.isUndefined(vehicle_type_id)){
        	$scope.truck.truck_capacity = $.grep($scope.vehicle_types, function (v) {
            	return v.id == vehicle_type_id;
        	})[0].capacity;
        }
        else{
        	$scope.truck.truck_capacity = '';
        }
        
        //alert("Selected Value: " + vehicle_type_id + "\ncapacity: " + $scope.truck.capacity);
    }

      $scope.editTruck = function() {
      	
		if(!angular.isUndefined($routeParams.id)){

			var truck_request = $http({
			    url: 'php/trucksCtrl.php?action=getTrucksList', 
			    method: "GET",
			    params: {id: $routeParams.id}
			 });
		    truck_request.then(function(response){
			$scope.truck = response.data[0];
			 $scope.editRC = true;
		    $scope.editInsurance = true;
		    $scope.editPollution = true;
		    $scope.editImage = true;
		    $scope.editFC = true;
		    $scope.edit = true;
		});
			
		}
	}

	$scope.cancelTruck = function() {
		$location.path( '/Trucks' );
		
	};
	 

	$scope.updateTruck=function($event){
		$event.preventDefault();
		if(!angular.isUndefined($scope.files)){
			$scope.truck_rc=$scope.files[0];
		}
		if(!angular.isUndefined($scope.files2)){
			$scope.truck_insurence=$scope.files2[0];
		}
		if(!angular.isUndefined($scope.files3)){
			$scope.truck_pollution=$scope.files3[0];
		}
		if(!angular.isUndefined($scope.files4)){
			$scope.truck_image=$scope.files4[0];
		}
		if(!angular.isUndefined($scope.files5)){
			$scope.truck_fitness_certificate=$scope.files5[0];
		}		
			
		$http({
				method:'POST',
				url:"php/trucksCtrl.php?action=updateTruck",
				processData:false,
				transformRequest:function(data){
					var formData=new FormData();
					formData.append("model", angular.toJson($scope.truck));
					if(!angular.isUndefined($scope.truck_rc)){
						formData.append("truck_rc", $scope.truck_rc);
					}
					if(!angular.isUndefined($scope.truck_insurence)){
						formData.append("truck_insurence", $scope.truck_insurence);
					}
					if(!angular.isUndefined($scope.truck_pollution)){
						formData.append("truck_pollution", $scope.truck_pollution);
					}
					if(!angular.isUndefined($scope.truck_image)){
						formData.append("truck_image", $scope.truck_image);
					}					
					if(!angular.isUndefined($scope.truck_fitness_certificate)){
						formData.append("truck_fitness_certificate", $scope.truck_fitness_certificate);
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
		        $location.path( '/Trucks' );

		        
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

		  $scope.uploadedFile4=function(element)
			{
				$scope.currentFile4 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	//var output1 = document.getElementById('output1');
    			//output1.src = URL.createObjectURL(element.files[0]);
    			//output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files4 = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.uploadedFile5=function(element)
			{
				$scope.currentFile5 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	//var output1 = document.getElementById('output1');
    			//output1.src = URL.createObjectURL(element.files[0]);
    			//output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files5 = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }


		  $scope.upload_aadhar_copy=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output1 = document.getElementById('aadhar_output');
    			output1.src = URL.createObjectURL(element.files[0]);
    			output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.aadhar_copy = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.upload_license_copy=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output1 = document.getElementById('license_output');
    			output1.src = URL.createObjectURL(element.files[0]);
    			output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.driving_license_copy = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.upload_profile_pic=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output1 = document.getElementById('profile_output');
    			output1.src = URL.createObjectURL(element.files[0]);
    			output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.profile_pic = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.updateProfile=function($event){
		$event.preventDefault();
		if(!angular.isUndefined($scope.profile_pic)){
			$scope.profile_pic=$scope.profile_pic[0];
		}
		if(!angular.isUndefined($scope.driving_license_copy)){
			$scope.driving_license_copy=$scope.driving_license_copy[0];
		}
		if(!angular.isUndefined($scope.aadhar_copy)){
			$scope.aadhar_copy=$scope.aadhar_copy[0];
		}
				
			
		$http({
				method:'POST',
				url:"php/trucksCtrl.php?action=updateProfile",
				processData:false,
				transformRequest:function(data){
					var formData=new FormData();
					formData.append("model", angular.toJson($scope.user));
					if(!angular.isUndefined($scope.aadhar_copy)){
						formData.append("aadhar_copy", $scope.aadhar_copy);
					}
					if(!angular.isUndefined($scope.driving_license_copy)){
						formData.append("driving_license_copy", $scope.driving_license_copy);
					}
					if(!angular.isUndefined($scope.profile_pic)){
						formData.append("profile_pic", $scope.profile_pic);
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
		        $location.path( '/Trucks' );

		        
		   });
		   
			};

	  

}]);
