<?php
session_start();
    if(isset($_SESSION['uid']) && $_SESSION['uid'] != "")
    {
        
    }
    else {
        header("Location: index.php");
    }
	
    
?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/css/bootstrap-datepicker.css" rel="stylesheet">
		<style>
		#httpload {
		    position: absolute;
		    background: white url('http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif') no-repeat center center;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		}
		#contentId{
		    background-color: #ebf8a4!important;
		    color: #000;
		    border-color: #a2d246;
		 }
		 .alert-success{
		 	/*color: #000;*/
   			 background-color: #ebf8a4;
   			border-color: #a2d246;
		 }
		</style>
		</head>
	<body ng-app="myApp" ng-controller="userCtrl">

		<div class="container-fluid first-n">
			<div class="row">
				<?php
				   if(isset($_SESSION["business_type"]) && $_SESSION["business_type"]=='Admin')
				   {
				?><div ng-include="'views/UserMenu.html'"></div>
				   <?php } else if(isset($_SESSION["business_type"]) && $_SESSION["business_type"]=='TransportCompany') { ?>
				   <div ng-include="'views/TransportCompanyMenu.html'"></div>
				   <?php } else if(isset($_SESSION["business_type"]) && $_SESSION["business_type"]=='TruckOwner') { ?>
				   <div ng-include="'views/TruckOwnerMenu.html'"></div>
				   <?php }?>
				
			</div>
		</div>
		<div data-loading> </div>
		<div ng-view></div>
		
		<div ng-include="'views/Footer.html'"></div>

		<div id="getCodeModal" class="modal">
		  <div class="modal-dialog">
		    <div id="contentId" class="modal-content">
		      <div class="modal-body">
		         <span class="glyphicon glyphicon-ok"></span><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button> 
		         <span id="getCode">Operation completed successfully..</span>
		      </div>
		    </div>
		  </div>
		</div>

		
		
        <!-- Modal -->
<!--<div class="modal fade" id="getCodeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-lg">
      <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <h4 class="modal-title" id="myModalLabel"> API CODE </h4>
       </div>
       <div class="modal-body" id="getCode" style="overflow-x: scroll;">
          //ajax success content here.
       </div>
    </div>
   </div>
 </div>-->
		
	</body>
	<script>
		var login_username = '<?php echo  isset($_SESSION["username"]) ?   $_SESSION["username"] :   "User"?>';
		var profile_name = '<?php echo  isset($_SESSION["business_type"]) ?   $_SESSION["business_type"] :   "User"?>';
	</script>
	<!--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDV1abdbca2TvxtnmDbam16ynjcJZNJb0o&libraries=places"></script>-->
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtPa7TXA96OZGfbak7J5kyfcXnxT_jP-U&libraries=places"></script>
	<script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.4.5/js/bootstrapvalidator.min.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/js/bootstrap-datepicker.js"></script>
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.min.js"></script>
	<script src="js/angular-route.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/controllers/loginCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/userCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/transportCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/trucksCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/profileCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/searchCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/bookingCtrl.js"></script>
	<script type="text/javascript" src="js/services/loginService.js"></script>
	<script type="text/javascript" src="js/services/sessionService.js"></script>
	<script type="text/javascript" src="js/ngAutocomplete.js"></script>
	<script type="text/javascript" src="js/dirPaginate.js"></script>
	
</html>