var app = angular.module('myApp', ['ngRoute','ngAutocomplete','angularUtils.directives.dirPagination']);
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

//app.factory('loginService', function($http, $q, $location, sessionService){
app.factory('accessFac',function($location,sessionService){
	var page_permissions_obj = sessionService.getPages();
	//alert(sessionService.get('business_type'));
	var obj = {}
	this.access = false;
	
	obj.checkPermission = function(){
		alert($location.path()+' '+sessionService.get('business_type'));
		var current_page = $location.path();
		var business_type = sessionService.get('business_type')
		for(page in page_permissions_obj) {
			//alert(page);
			if(current_page.indexOf(page) !== -1){
				var page_obj = page_permissions_obj[page];
				alert('authenticate'+page_permissions_obj[page].authenticate);
				if(page_permissions_obj[page].authenticate === 'True' && business_type!=null) {
					
					alert(page_obj.hasOwnProperty(business_type)+'g'+page_obj[business_type]);
					if(page_obj.hasOwnProperty(business_type) && page_obj[business_type] === 'True') {
							this.access = true;						
					}
				} else if(page_permissions_obj[page].authenticate === 'false' && business_type!=null) {
						alert('elseIf');
						if(page_obj.hasOwnProperty(business_type) && page_obj[business_type] === 'True') {
							
							this.access = true;						
					}
				} else {
					alert('else');
					this.access = true;	
				}
			}
		}
		return this.access;				//returns the users permission level 
	}
	return obj;
});


app.directive('loading',   ['$http' ,function ($http)
 {
     return {
         restrict: 'A',
         template: '<div id="divProcessing"><span class="std_loadingBackground"></span><div style="top: 30%; left: 40%;" class="std_modalContainer"><div class="std_tcenter"><img id="myAnimatedImage" alt="Processing.... Please wait!" src="images/ajax-loader.gif"><span class="std_processing">Processing... Please wait!</span></div></div></div>',
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
		controller: 'searchCtrl'
	}).when('/Home', {
		templateUrl: 'views/Home.html',
		controller: 'searchCtrl'
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
	}).when('/SignIn/:msg?', {
		templateUrl: 'views/SignIn.html',
		controller: 'loginCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission()){  
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/ForgotPassword', {
		templateUrl: 'views/ForgotPassword.html',
	}).when('/ClickMore', {
		templateUrl: 'views/ClickMore.html',
	}).when('/Transporters', {
		templateUrl: 'views/Transporters.html',
	}).when('/UpdateLoginDetails', {
		templateUrl: 'views/UpdateLoginDetails.html',
		controller: 'profileCtrl'
	})
	.when('/ChangePassword', {
		templateUrl: 'views/ChangePassword.html',
		controller: 'profileCtrl'

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
		controller: 'searchCtrl'

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
	}).when('/TruckOwnerAuditReport', {
		templateUrl: 'views/TruckOwnerAuditReport.html',
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
	}).when('/TransportCompanyProfile/:pSucess?', {
		templateUrl: 'views/TransportCompanyProfile.html',
		controller: 'profileCtrl'
	}).when('/TransporterDocument', {
		templateUrl: 'views/TransporterDocument.html',
	}).when('/MyLoads', {
		templateUrl: 'views/MyLoads.html',
		controller: 'MyLoadsCtrl' ,
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission()){  
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/PostingLoads/:id?', {
		templateUrl: 'views/PostingLoads.html',
		controller: 'PostingLoadsCtrl'
	}).when('/TruckOwnerProfile/:pSucess?', {
		templateUrl: 'views/TruckOwnerProfile.html',
		controller: 'profileCtrl'
	}).when('/PastLoads', {
		templateUrl: 'views/PastLoads.html',
		controller: 'MyLoadsCtrl'
	}).when('/Trucks', {
		templateUrl: 'views/Trucks.html',
		controller: 'trucksCtrl'
	}).when('/UserTruckRequest', {
		templateUrl: 'views/UserTruckRequest.html',
	}).when('/SelectTruck/:loadId', {
		templateUrl: 'views/OwnerSelectTruck.html',
		controller: 'searchCtrl'
	}).when('/AddBankAccount', {
		templateUrl: 'views/AddBankAccount.html',
	}).when('/RavaanaWallet', {
		templateUrl: 'views/RavaanaWallet.html',
	}).when('/UserLoadRequest', {
		templateUrl: 'views/UserLoadRequest.html',
		controller: 'bookingCtrl'
	}).when('/Drivers', {
		templateUrl: 'views/Drivers.html',
		controller: 'driversCtrl'
	}).when('/AddDriver/:id?', {
		templateUrl: 'views/AddDriver.html',
		controller: 'driversCtrl'
	}).when('/Branches', {
		templateUrl: 'views/Branches.html',
		controller: 'branchListCtrl'
	}).when('/addBranch/:id?', {
		templateUrl: 'views/NewBranches.html',
		controller: 'branchListCtrl'
	}).when('/MyLoadBooking', {
		templateUrl: 'views/MyLoadBooking.html',
		controller: 'bookingCtrl'
	}).when('/AddNewTruck/:id?', {
		templateUrl: 'views/AddNewTruck.html',
		controller: 'trucksCtrl'
	}).when('/TransporterDocuments', {
		templateUrl: 'views/TransporterDocuments.html',
		controller: 'profileCtrl'
		
	}).when('/TruckOwnerDocuments', {
		templateUrl: 'views/TruckOwnerDocuments.html',
		controller: 'profileCtrl'
		
	}).when('/booktruck',{
		templateUrl:'views/booktruck.html',
		controller: 'PostingLoadsCtrl'
	}).when('/paymentsuccess',{
		templateUrl:'views/paymentsuccess.html',
	})
	.otherwise({
        templateUrl: 'views/404.html',
    })

	
});




