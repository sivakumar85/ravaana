'use strict';

app.controller('loginCtrl', function($scope, loginService){
	$scope.errorLogin = false;
	
	$scope.login = function($event){
		$event.preventDefault();
		loginService.login($scope.user, $scope);
	}
	
	$scope.register = function($event){
		$event.preventDefault();
		loginService.register($scope.user, $scope);
	}
	$scope.verifyUser = function($event){
		$event.preventDefault();
		loginService.verifyUser($scope.user, $scope);
	}

	$scope.clearMsg = function(){
		$scope.errorLogin = false;
	}
});