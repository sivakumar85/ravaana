'use strict';

app.controller('loginCtrl', function($scope,$routeParams, loginService, sessionService){
	$scope.errorLogin = false;
	$scope.regMsg = false;
	$scope.loginMsg = false;
	$scope.business_type = !angular.isUndefined(sessionService.get('business_type')) ? sessionService.get('business_type') : '';

	if(!angular.isUndefined($routeParams.msg)){
		if($routeParams.msg == 'regMsg'){
			$scope.regMsg = true;
		} else if($routeParams.msg == 'loginMsg'){
			$scope.loginMsg = true;
		}
		
	}
	
	
	$scope.login = function($event){
		$event.preventDefault();
		$scope.regMsg = false;
	$scope.loginMsg = false;
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