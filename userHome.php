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
		
		<!--<div id="myModal" class="modal fade" role="dialog">
	         <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                         <button type="button" class="close" data-dismiss="modal">×</button>
                         <h4 class="modal-title">Error!!</h4>
                   </div>
                   <div class="modal-body">
                        
                   </div>
                   <div class="modal-footer">
                         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                   </div>
                </div>
	        </div>
        </div>-->
		
	</body>
	<script>
		var login_username = '<?php echo  isset($_SESSION["username"]) ?   $_SESSION["username"] :   "User"?>';
		//alert('login_username-->'+'<?php echo $_SESSION["username"]?>');
	</script>
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
	<script type="text/javascript" src="js/services/loginService.js"></script>
	<script type="text/javascript" src="js/services/sessionService.js"></script>
	
</html>