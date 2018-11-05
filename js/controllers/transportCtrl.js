app.controller('PostingLoadsCtrl', ['$scope','$routeParams','$http','$location','loginService', function($scope,$routeParams, $http,$location,loginService){
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
	      alert(response.data.message);
	      /*$('.modal-body').load("Post  created Successfully",function(){
            $('#myModal').modal({show:true});
          });*/
	      $location.path( '/MyLoads' );
	    }, function errorCallback(response) {
	      alert("Error. while created Post Try Again!");
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
	      alert("Error. while created Post Try Again!");
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
                	 alert(response.message);
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
                	 alert(response.message);
                     $scope.displayPosts();
                }); 
      }
	  

}]);

app.controller('TransportCompanyProfileCtrl', ['$scope','$http','$location', function($scope, $http,$location){
	$scope.errorProfile = false;
	//fetch login user Profile
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
		var branch_request = $http.get('php/branchList.php');;
		branch_request.then(function(response){
			$scope.branches = response.data;
		});
	}

	$scope.cancelUpdate = function() {
		window.location.reload();
	};
	$scope.clearMsg = function(){
		$scope.errorProfile = false;
	}
	
    	$scope.form=[];
    	$scope.files=[];
		$scope.insert=function(){
			//$event.preventDefault();
			var formData=new FormData();
			var userData = $scope.user;
			if(!angular.isUndefined($scope.files[0])){
				$scope.image1=$scope.files[0];
				formData.append("image1", $scope.image1);
			}
			if(!angular.isUndefined($scope.files2[0])){
				$scope.image2=$scope.files2[0];
				formData.append("image2", $scope.image2);
			}
			if(!angular.isUndefined($scope.files3[0])){
				$scope.image3=$scope.files3[0];
				formData.append("image3", $scope.image3);
			}
			if(!angular.isUndefined($scope.files4[0])){
				$scope.image4=$scope.files4[0];
				formData.append("image4", $scope.image4);
			}
			if(!angular.isUndefined(userData.aadhar_number)){
				$scope.aadhar_number=userData.aadhar_number;
				
			}
			if(!angular.isUndefined(userData.panCard_number)){
				$scope.panCard_number=userData.panCard_number;
				
			}
			if(!angular.isUndefined(userData.company_name)){
				$scope.company_name=userData.company_name;
				
			}
			if(!angular.isUndefined(userData.id)){
				$scope.pid=userData.id;
				formData.append("pid", $scope.pid);
				
			}

					
			formData.append("aadhar_number", $scope.aadhar_number);
			formData.append("panCard_number", $scope.panCard_number);
			formData.append("company_name", $scope.company_name);
			
			
			
			
			
			
			
			$http({
				method:'POST',
				url:"php/upload.php",
				processData:false,
				transformRequest:function(data){				
					

			      return formData;
			      return $scope.aadhar_number;
			      return $scope.panCard_number;
			      return $scope.company_name;  
			  },  
			  data : $scope.form,
			  headers: {
			         'Content-Type': undefined
			  }
		   }).success(function(data){

		   		if(data.message!==''){
		   			window.location.href="userHome.php#/TransportCompanyProfile";
					    //$location.path( '/TransportCompanyProfile' );
    				} else {
    					$scope.errorProfile = true;
    					$scope.errorMsg = data.error;
    					$scope.fetchProfile();
    				}
		       
		        
		   });
		   
			};
			$scope.uploadedFile=function(element)
			{
				$scope.currentFile = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output = document.getElementById('output');
    			output.src = URL.createObjectURL(element.files[0]);
	
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
		    	var output1 = document.getElementById('output1');
    			output1.src = URL.createObjectURL(element.files[0]);
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
		    	var output2 = document.getElementById('output2');
    			output2.src = URL.createObjectURL(element.files[0]);
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
		    	var output3 = document.getElementById('output3');
    			output3.src = URL.createObjectURL(element.files[0]);
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files4 = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }
		
	

}]);