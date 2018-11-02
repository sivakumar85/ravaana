'use strict';

app.controller('homeCtrl', ['$scope', 'loginService', function($scope, loginService){
	//logout
	$scope.logout = function(){
		loginService.logout();
	}
	
	//fetch login user
	/*var userrequest = loginService.fetchuser();
	userrequest.then(function(response){
		$scope.user = response.data[0];
	});*/

}]);

