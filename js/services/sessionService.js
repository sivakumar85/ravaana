'use strict';

app.factory('sessionService', ['$http', function($http){
	return{
		set: function(key, value){
			return sessionStorage.setItem(key, value);
		},
		get: function(key){
			return sessionStorage.getItem(key);
		},
		destroy: function(key){
			//$http.post('php/logout.php');
			return sessionStorage.removeItem(key);
		},
		getPages: function(){
			var pages= {
					MyLoads:{TruckOwner:'false',TransportCompany:'True',authenticate:'True'},
					SignIn:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'}
				  };
			return pages;

		}
	};
}]);