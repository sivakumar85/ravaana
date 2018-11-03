var app = angular.module('myApp', ['ngRoute']);
app.controller('homectrl', ['$scope', '$location',function($scope, $location){ 
$scope.go = function ( path ) {
  $location.path( path );
};
$scope.userLogin = function ( ) {
  $scope.menu = 'userMenu';
  window.location.href = 'userHome.html#/UsersList';
};
$scope.userLogout = function ( ) {
	//alert('sdf');
  $scope.menu = 'userMenu';
  window.location.href = 'index.html';
};
}]);

app.directive('loading',   ['$http' ,function ($http)
 {
     return {
         restrict: 'A',
         template: '<div id="divProcessing"><span class="std_loadingBackground"></span><div style="top: 30%; left: 40%;" class="std_modalContainer"><div class="std_tcenter"><img id="myAnimatedImage" alt="Processing... Please wait!" src="images/ajax-loader.gif"><span class="std_processing">Processing... Please wait!</span></div></div></div>',
         link: function (scope, elm, attrs)
         {
             scope.isLoading = function () {
                 return $http.pendingRequests.length > 0;
             };

             scope.$watch(scope.isLoading, function (v)
             {
                 if(v){
                     elm.show();
                 }else{
                     elm.hide();
                 }
             });
         }
     };
 }]);



// This configures the routes here
app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/Home.html',
		controller: 'homectrl'
	}).when('/Home', {
		templateUrl: 'views/Home.html',
		controller: 'homectrl'
	}).when('/RoadRavaana', {
		templateUrl: 'views/RoadRavaana.html',
	}).when('/TrainRavaana', {
		templateUrl: 'views/TrainRavaana.html',
	}).when('/AirRavaana', {
		templateUrl: 'views/AirRavaana.html',
	}).when('/SeaRavaana', {
		templateUrl: 'views/SeaRavaana.html',
	}).when('/ContactUs', {
		templateUrl: 'views/ContactUs.html',
	}).when('/AboutUs', {
		templateUrl: 'views/AboutUs.html',
	}).when('/SignUp', {
		templateUrl: 'views/SignUp.html',
		controller: 'loginCtrl'
	}).when('/SignIn', {
		templateUrl: 'views/SignIn.html',
		controller: 'loginCtrl'
	}).when('/ForgotPassword', {
		templateUrl: 'views/ForgotPassword.html',
	}).when('/ClickMore', {
		templateUrl: 'views/ClickMore.html',
	}).when('/Transporters', {
		templateUrl: 'views/Transporters.html',
	}).when('/UpdateLoginDetails', {
		templateUrl: 'views/UpdateLoginDetails.html',
	})
	.when('/ChangePassword', {
		templateUrl: 'views/ChangePassword.html',
	}).when('/RolesList', {
		templateUrl: 'views/RolesList.html',
	}).when('/NewRole', {
		templateUrl: 'views/NewRole.html',
	}).when('/UsersList', {
		templateUrl: 'views/UsersList.html',
	}).when('/ViewRole', {
		templateUrl: 'views/RolesList.html',
	}).when('/PlanFeatures', {
		templateUrl: 'views/PlanFeatures.html',
	}).when('/PricePlans', {
		templateUrl: 'views/PricePlans.html',
	}).when('/MapFeatures', {
		templateUrl: 'views/MapFeatures.html',
	}).when('/AuditReport', {
		templateUrl: 'views/AuditReport.html',
	}).when('/Search', {
		templateUrl: 'views/Search.html',
	}).when('/userHome', {
		templateUrl: 'views/Search.html',
	}).when('/TruckRequests', {
		templateUrl: 'views/TruckRequests.html',
	}).when('/AssignTruck', {
		templateUrl: 'views/AssignTruck.html',
	}).when('/UserProfile', {
		templateUrl: 'views/UserProfile.html',
	}).when('/TruckBooking', {
		templateUrl: 'views/TruckBooking.html',
	}).when('/SuspendPost', {
		templateUrl: 'views/SuspendPost.html',
	}).when('/MenuCategoriesList', {
		templateUrl: 'views/MenuCategoriesList.html',
	}).when('/NewMenuCategoryList', {
		templateUrl: 'views/NewMenuCategoryList.html',
	}).when('/CitiesList', {
		templateUrl: 'views/CitiesList.html',
	}).when('/CitiesList2', {
		templateUrl: 'views/CitiesList2.html',
	}).when('/NewCity', {
		templateUrl: 'views/NewCity.html',
	}).when('/LoadTypeList', {
		templateUrl: 'views/LoadTypeList.html',
	}).when('/NewLoadType', {
		templateUrl: 'views/NewLoadType.html',
	}).when('/LocationsList', {
		templateUrl: 'views/LocationsList.html',
	}).when('/TruckTypes', {
		templateUrl: 'views/TruckTypes.html',
	}).when('/ViewTruck', {
		templateUrl: 'views/ViewTruck.html',
	}).when('/DataBaseErrorLog', {
		templateUrl: 'views/DataBaseErrorLog.html',
	}).when('/EmailLogReport', {
		templateUrl: 'views/EmailLogReport.html',
	}).when('/ErrorLog', {
		templateUrl: 'views/ErrorLog.html',
	}).when('/LoginLog', {
		templateUrl: 'views/LoginLog.html',
	}).when('/SMSLog', {
		templateUrl: 'views/SMSLog.html',
	}).when('/Payments', {
		templateUrl: 'views/Payments.html',
	}).when('/EditProfile', {
		templateUrl: 'views/EditProfile.html',
	}).when('/CityDetails', {
		templateUrl: 'views/CityDetails.html',
	}).when('/ViewLoadList', {
		templateUrl: 'views/ViewLoadList.html',
	}).when('/NewLocationList', {
		templateUrl: 'views/NewLocationList.html',
	}).when('/VerifyCode', {
		templateUrl: 'views/VerifyCode.html',
		controller: 'loginCtrl'
	}).when('/TransportCompanyProfile', {
		templateUrl: 'views/TransportCompanyProfile.html',
		controller: 'TransportCompanyProfileCtrl'
	}).when('/TransporterDocument', {
		templateUrl: 'views/TransporterDocument.html',
	}).when('/MyLoads', {
		templateUrl: 'views/MyLoads.html',
		controller: 'MyLoadsCtrl'
	}).when('/PostingLoads/:id?', {
		templateUrl: 'views/PostingLoads.html',
		controller: 'PostingLoadsCtrl'
	}).when('/TruckOwnerProfile', {
		templateUrl: 'views/TruckOwnerProfile.html',
	}).when('/PastLoads', {
		templateUrl: 'views/PastLoads.html',
	}).when('/Trucks', {
		templateUrl: 'views/Trucks.html',
	}).when('/Drivers', {
		templateUrl: 'views/Drivers.html',
	}).when('/AddDriver', {
		templateUrl: 'views/AddDriver.html',
	}).when('/Branches', {
		templateUrl: 'views/Branches.html',
		controller: 'branchListCtrl'
	}).when('/addBranch/:id?', {
		templateUrl: 'views/NewBranches.html',
		controller: 'branchListCtrl'
	}).when('/MyLoadBooking', {
		templateUrl: 'views/MyLoadBooking.html',
	}).when('/AddNewTruck', {
		templateUrl: 'views/AddNewTruck.html',
	}).when('/TransporterDocuments', {
		templateUrl: 'views/TransporterDocuments.html',
		controller: 'TransportCompanyProfileCtrl'
		
	}).otherwise({
        templateUrl: 'views/404.html',
    })

	
});




