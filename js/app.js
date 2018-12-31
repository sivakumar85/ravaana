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
app.factory('accessFac',function($location,$http,sessionService){
	//var page_permissions_obj = sessionService.getPages();
	var business_type = sessionService.get('business_type');
	
	var obj = {}
	this.access = true;
	//var current_page = $location.path();

	obj.checkPermission = function(page){
		//alert($location.path()+' '+sessionService.get('business_type'));
		//alert('page-->'+page);
		/*var logIn_request = $http({
	    url: 'php/session.php', 
	    method: "GET",			    
		 });
		    logIn_request.then(function(response){
		    	business_type = response.data.business_type;
		});*/
		//alert('business_type'+business_type);
		
			//alert(page);
			/*if(page_permissions_obj.hasOwnProperty(page)){
				var page_obj = page_permissions_obj[page];
				//alert('authenticate'+page_permissions_obj[page].authenticate);
				if(page_permissions_obj[page].authenticate === 'true' && business_type!=null) {
					
					//alert(page_obj.hasOwnProperty(business_type)+'g'+page_obj[business_type]);
					if(page_obj.hasOwnProperty(business_type) && page_obj[business_type] === 'true') {
							//alert('if');
							this.access = true;						
					}
				} else if(page_permissions_obj[page].authenticate === 'false' && business_type!=null) {
						//alert('elseIf');
						if(page_obj.hasOwnProperty(business_type) && page_obj[business_type] === 'true') {
							
							this.access = true;						
					}
				} else if(page_permissions_obj[page].authenticate === 'true' && business_type==null) {
						//alert('elseIf1');
						this.access = false;						
				} else {
					//alert('else');
					this.access = true;	
				}
			}*/
		
		/*if(current_page=='/'){
			this.access = true;
		}*/
		//alert(this.access);
		return true;//this.access;				//returns the users permission level 
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
		controller: 'searchCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('Home')){  
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/RoadRavaana', {
		templateUrl: 'views/RoadRavaana.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('RoadRavaana')){ 
					$location.path('/');				
					//alert("You don't have access here");	
				}
			}
		}
	}).when('/TrainRavaana', {
		templateUrl: 'views/TrainRavaana.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TrainRavaana')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AirRavaana', {
		templateUrl: 'views/AirRavaana.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AirRavaana')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/SeaRavaana', {
		templateUrl: 'views/SeaRavaana.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('SeaRavaana')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/ContactUs', {
		templateUrl: 'views/ContactUs.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('ContactUs')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AboutUs', {
		templateUrl: 'views/AboutUs.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AboutUs')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/SignUp', {
		templateUrl: 'views/SignUp.html',
		controller: 'loginCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('SignUp')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/SignIn/:msg?', {
		templateUrl: 'views/SignIn.html',
		controller: 'loginCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('SignIn')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/ForgotPassword', {
		templateUrl: 'views/ForgotPassword.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('ForgotPassword')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/ClickMore', {
		templateUrl: 'views/ClickMore.html',
	}).when('/Transporters', {
		templateUrl: 'views/Transporters.html',
	}).when('/UpdateLoginDetails', {
		templateUrl: 'views/UpdateLoginDetails.html',
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('UpdateLoginDetails')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	})
	.when('/ChangePassword', {
		templateUrl: 'views/ChangePassword.html',
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('ChangePassword')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}

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
		controller: 'searchCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('Search')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}

	}).when('/userHome', {
		templateUrl: 'views/Search.html',
	}).when('/TruckRequests', {
		templateUrl: 'views/TruckRequests.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TruckRequests')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AssignTruck', {
		templateUrl: 'views/AssignTruck.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AssignTruck')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/UserProfile', {
		templateUrl: 'views/UserProfile.html',
	}).when('/TruckBooking', {
		templateUrl: 'views/TruckBooking.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TruckBooking')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
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
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TransportCompanyProfile')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/TransporterDocument', {
		templateUrl: 'views/TransporterDocument.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TransporterDocument')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/MyLoads', {
		templateUrl: 'views/MyLoads.html',
		controller: 'MyLoadsCtrl' ,
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('MyLoads')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/PostingLoads/:id?', {
		templateUrl: 'views/PostingLoads.html',
		controller: 'PostingLoadsCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('PostingLoads')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/TruckOwnerProfile/:pSucess?', {
		templateUrl: 'views/TruckOwnerProfile.html',
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TruckOwnerProfile')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/PastLoads', {
		templateUrl: 'views/PastLoads.html',
		controller: 'MyLoadsCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('PastLoads')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/Trucks', {
		templateUrl: 'views/Trucks.html',
		controller: 'trucksCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('Trucks')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/UserTruckRequest', {
		templateUrl: 'views/UserTruckRequest.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('UserTruckRequest')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/SelectTruck/:loadId', {
		templateUrl: 'views/OwnerSelectTruck.html',
		controller: 'searchCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('SelectTruck')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AddBankAccount', {
		templateUrl: 'views/AddBankAccount.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AddBankAccount')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/RavaanaWallet', {
		templateUrl: 'views/RavaanaWallet.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('RavaanaWallet')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/UserLoadRequest', {
		templateUrl: 'views/UserLoadRequest.html',
		controller: 'bookingCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('UserLoadRequest')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/Drivers', {
		templateUrl: 'views/Drivers.html',
		controller: 'driversCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('Drivers')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AddDriver/:id?', {
		templateUrl: 'views/AddDriver.html',
		controller: 'driversCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AddDriver')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/Branches', {
		templateUrl: 'views/Branches.html',
		controller: 'branchListCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('Branches')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/addBranch/:id?', {
		templateUrl: 'views/NewBranches.html',
		controller: 'branchListCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('addBranch')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/MyLoadBooking', {
		templateUrl: 'views/MyLoadBooking.html',
		controller: 'bookingCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('MyLoadBooking')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/AddNewTruck/:id?', {
		templateUrl: 'views/AddNewTruck.html',
		controller: 'trucksCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('AddNewTruck')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/TransporterDocuments', {
		templateUrl: 'views/TransporterDocuments.html',
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TransporterDocuments')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
		
	}).when('/TruckOwnerDocuments', {
		templateUrl: 'views/TruckOwnerDocuments.html',
		controller: 'profileCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('TruckOwnerDocuments')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
		
	}).when('/booktruck',{
		templateUrl:'views/booktruck.html',
		controller: 'searchCtrl',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('booktruck')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/paymentsuccess',{
		templateUrl:'views/paymentsuccess.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('paymentsuccess')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/VerifyOtp',{
		templateUrl:'views/VerifyOtp.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('VerifyOtp')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	}).when('/setnewpassword',{
		templateUrl:'views/setnewpassword.html',
		resolve:{
		"check":function(accessFac,$location){   
				if(!accessFac.checkPermission('setnewpassword')){ 
					$location.path('/');				
					alert("You don't have access here");	
				}
			}
		}
	})

	
	.otherwise({
        templateUrl: 'views/404.html',
    })

	
});




