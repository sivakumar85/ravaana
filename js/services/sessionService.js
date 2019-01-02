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
							Home:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							RoadRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							TrainRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							AirRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							SeaRavaana:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							warehousing:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							ticketbooking:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							ContactUs:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							AboutUs:{TruckOwner:'true',TransportCompany:'true',authenticate:'false',Admin:'true'},
							SignUp:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							SignIn:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							ForgotPassword:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							VerifyCode:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							VerifyOtp:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							setnewpassword:{TruckOwner:'false',TransportCompany:'false',authenticate:'false',Admin:'false'},
							TransporterDocuments:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							TruckBooking:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							AuditReport:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							PostingLoads:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							MyLoads:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							Branches:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							addBranch:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							UserLoadRequest:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							TransportCompanyProfile:{TruckOwner:'false',TransportCompany:'true',authenticate:'true',Admin:'true'},
							Search:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							TruckOwnerDocuments:{TruckOwner:'true',TransportCompany:'false',authenticate:'true',Admin:'false'},
							TruckOwnerAuditReport:{TruckOwner:'true',TransportCompany:'false',authenticate:'true',Admin:'false'},
							TruckOwnerProfile:{TruckOwner:'true',TransportCompany:'false',authenticate:'true',Admin:'false'},
							MyLoadBooking:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							Trucks:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							AddNewTruck:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							Drivers:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							AddDriver:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							UserTruckRequest:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							AddBankAccount:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							UpdateLoginDetails:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
							ChangePassword:{TruckOwner:'true',TransportCompany:'true',authenticate:'true',Admin:'true'},
				 		};
			return pages;

		}
	};
}]);