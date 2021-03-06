'use strict';

app.factory('loginService', function($http, $q, $location, sessionService){
 var message = undefined;

	return{
		login: function(user, $scope){
			var validate = $http.post('php/login.php', user);
			validate.then(function(response){
				var uid = response.data.uid;
				var business_type = response.data.business_type;
				var profile_complete = response.data.profile_complete
				if(uid){
					sessionService.set('uid',uid);
					sessionService.set('business_type',business_type);
					//alert(sessionService.get('business_type'));
					if(business_type == 'Admin') {
						window.location.href = 'userHome.php#/UsersList';
					} else if (business_type == 'TransportCompany') {
						if(profile_complete == 1) { 
							window.location.href = 'userHome.php#/MyLoads';
						} else {
							window.location.href = 'userHome.php#/TransporterDocuments';
						}
					} else if (business_type == 'TruckOwner') {
						if(profile_complete == 1) { 
							window.location.href = 'userHome.php#/TruckBooking';
						} else {
							window.location.href = 'userHome.php#/TruckOwnerDocuments';
						}
					}
					
				}
				
				else{
					$scope.successLogin = false;
					$scope.errorLogin = true;
					$scope.errorMsg = response.data.message;
				}
			});
		},
		/*register: function(user, $scope){
			 var deferred = $q.defer();
			var validate = $http.post('php/register.php', user);
			validate.then(function(response){
			//alert(response);
				 message = response.data.message;
				if(message!=''){
					window.location.href = 'index.php#/SignIn';
				}
				
				else{
					$scope.successLogin = false;
					$scope.errorLogin = true;
					$scope.errorMsg = response.data.error;
				}
			});
		},*/
		register: function (user, $scope) {
		    // $scope.prograssing = true;
            var deferred = $q.defer();
            if (message) {
                deferred.resolve(message);
            } else {
                $http.post('php/register.php', user).then(function (respond) {
                    
                    message = respond.data.message;
                    deferred.resolve(respond.data.message);
                    //$scope.prograssing = false;
                    //console.log(respond);
                    if(message!==''){
                    	//sessionService.set('uid',uid);
                    	sessionService.set('business_type',respond.data.business_type);
					    $location.path( '/VerifyCode' );
    				} else {
    					$scope.errorMsg = respond.data.error;
    				}
                }, function (error, code) {
                    deferred.reject(error);
                    $scope.errorMsg = error;
                    //$scope.prograssing = false;
                    
                });
            }

            return deferred.promise;

        },
		verifyUser: function (user, $scope) {
		    var deferred = $q.defer();
            
			$http.post('php/verifyUser.php', user).then(function (respond) {
				
				message = respond.data.message;
				deferred.resolve(respond.data.message);
				//$scope.prograssing = false;
				//console.log(respond);
				if(message!==''){
					window.location.href = 'index.php#/SignIn/regMsg';
				} else {
					$scope.errorVerification = true;
					$scope.errorMsg = respond.data.error;
				}
			}, function (error, code) {
				deferred.reject(error);
				$scope.errorMsg = error;
				//$scope.prograssing = false;
				
			});
            

            return deferred.promise;

        },
		logout: function(){
			sessionService.destroy('uid');
			sessionService.destroy('business_type');
			var logout_request = $http({
			    url: 'php/logout.php', 
			    method: "post",
			 });
		    logout_request.then(function(response){
			window.location.href = 'index.php';
		});
			
		},
		
		fetchuser: function(){
			var user = $http.get('php/fetch.php');
			return user;
		},
		getLoadTypes:function(){
			var loadTypes = $http.get('php/loadTypes.php');
			return loadTypes;
		},
		getVehicleTypes:function(){
			var vehicleTypes = $http.get('php/vehicleTypes.php');
			return vehicleTypes;
		}
	}
});