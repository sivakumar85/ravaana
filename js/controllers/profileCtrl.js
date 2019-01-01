app.controller('profileCtrl', ['$scope','$rootScope','$routeParams','$http','$location','loginService', function($scope,$rootScope,$routeParams, $http,$location,loginService){
	$scope.form=[];
    $scope.files=[];
    $scope.errorProfile = false;
    $scope.profile = '';
    $scope.sendOTP = true;
    //fetch login user Profile
	if(!angular.isUndefined($routeParams.pSucess)){
		$rootScope.$emit("CalluserCtrlMethod", {});
		var url =  $location.path();
		var url = url.replace("/pSucess", "");
		 $location.path(url);
	}
	$scope.fetch = function(){
		var userrequest = $http.get('php/profileCtrl.php?action=fetch');
		userrequest.then(function(response){
			$scope.user = response.data[0];
		});
	}

	$scope.fetchProfile = function(){
		var userrequest = $http.get('php/profileCtrl.php?action=fetchProfile');
		userrequest.then(function(response){
			$scope.user = response.data[0];
		});
		var branch_request = $http.get('php/branchList.php');;
		branch_request.then(function(response){
			$scope.branches = response.data;
		});
	}
	
	$scope.changePassword = function($event) {
	  	$event.preventDefault();
	  	console.log($scope.user);
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/profileCtrl.php?action=changePassword',
	      data: $scope.user
	    }).then(function successCallback(response) {
	    	alert(response.data.message);
	      /*$("#getCode").html(response.data.message);
		  $("#getCodeModal").modal('show');*/
	      loginService.logout();
	    }, function errorCallback(response) {
	      //alert("Error. while created Post Try Again!");
	      $("#getCode").html("Error. while created Post Try Again!");
		  $("#getCodeModal").modal('show');
	    });
	  };

	$scope.updateLoginDetails = function($event) {
	  	$event.preventDefault();
	  	console.log($scope.user);
	    //$http POST function
	    $http({
	      method: 'POST',
	      url: 'php/profileCtrl.php?action=updateLoginDetails',
	      data: $scope.user
	    }).then(function successCallback(response) {
	    	//alert(response.data.message);
	    	if($scope.sendOTP){
	    		$("#getCode").html(response.data.message);
		  		$("#getCodeModal").modal('show');
		  		$scope.sendOTP = false;
	    	} else {
	    		alert(response.data.message);
	    		loginService.logout();
	    	}
	      
	      
	    }, function errorCallback(response) {
	      //alert("Error. while created Post Try Again!");
	      $("#getCode").html("Error. while created Post Try Again!");
		  $("#getCodeModal").modal('show');
	    });
	  };

	$scope.cancelUpdate = function() {
		window.location.reload();
	};
	$scope.clearMsg = function(){
		$scope.errorProfile = false;
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

		  $scope.upload_company_panCard=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output1 = document.getElementById('pancard_output');
    			output1.src = URL.createObjectURL(element.files[0]);
    			output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.company_panCard = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.upload_company_certificate=function(element)
			{
				$scope.currentFile2 = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output1 = document.getElementById('cert_output');
    			output1.src = URL.createObjectURL(element.files[0]);
    			output1.style.display = 'block';
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.company_certificate = element.files;
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
		if(!angular.isUndefined($scope.company_certificate)){
			$scope.company_certificate=$scope.company_certificate[0];
		}
		if(!angular.isUndefined($scope.company_panCard)){
			$scope.company_panCard=$scope.company_panCard[0];
		}
				
			
		$http({
				method:'POST',
				url:"php/profileCtrl.php?action=updateProfile",
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
					if(!angular.isUndefined($scope.company_panCard)){
						formData.append("company_panCard", $scope.company_panCard);
					}
					if(!angular.isUndefined($scope.company_certificate)){
						formData.append("company_certificate", $scope.company_certificate);
					}
					
				 console.log(formData);
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
		        if($scope.user.business_type == 'TransportCompany') {
		        	window.location.href =  'userHome.php#/TransportCompanyProfile/pSucess' ;
		        } else if($scope.user.business_type == 'TruckOwner') {
		        	window.location.href =  'userHome.php#/TruckOwnerProfile/pSucess' ;
		        }
		        

		        
		   });
		   
			};
}]);