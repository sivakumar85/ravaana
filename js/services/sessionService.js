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
					Home:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
RoadRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
TrainRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
AirRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
SeaRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
warehousing:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
ticketbooking:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
ContactUs:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
AboutUs:{TruckOwner:'true',TransportCompany:'true',authenticate:'false'},
SignUp:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
SignIn:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
ForgotPassword:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
VerifyCode:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
VerifyOtp:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
setnewpassword:{TruckOwner:'false',TransportCompany:'false',authenticate:'false'},
TransporterDocuments:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
TruckBooking:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
AuditReport:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
PostingLoads:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
MyLoads:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
Branches:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
addBranch:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
UserLoadRequest:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
TransportCompanyProfile:{TruckOwner:'false',TransportCompany:'true',authenticate:'true'},
Search:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
TruckOwnerDocuments:{TruckOwner:'true',TransportCompany:'false',authenticate:'true'},
TruckOwnerAuditReport:{TruckOwner:'true',TransportCompany:'false',authenticate:'true'},
TruckOwnerProfile:{TruckOwner:'true',TransportCompany:'false',authenticate:'true'},
MyLoadBooking:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
Trucks:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
AddNewTruck:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
Drivers:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
AddDriver:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
UserTruckRequest:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
AddBankAccount:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
UpdateLoginDetails:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},
ChangePassword:{TruckOwner:'true',TransportCompany:'true',authenticate:'true'},


				  };
			return pages;

		}
	};
}]);