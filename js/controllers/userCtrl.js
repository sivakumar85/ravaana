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


/*app.controller('TransportCompanyProfileCtrl', ['$scope','$http','$location', function($scope, $http,$location){
	var userrequest = $http.get('php/fetchUserProfile.php');
	userrequest.then(function(response){
		$scope.user = response.data[0];
	});

}]);*/
