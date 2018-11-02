<?php
session_start();
    if(isset($_SESSION['uid']) && $_SESSION['uid'] != "")
        {
            header("Location: userHome.php");
         }
    
?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"> 
		</head>
	<body ng-app="myApp">
	
		<div class="container-fluid first-n">
			<div class="row">
				<div ng-include="'views/Menu.html'"></div>
				
			</div>
		</div>
		<div data-loading> </div>
		<div ng-view></div>
		
		<div ng-include="'views/Footer.html'"></div>
		
		
	</body>
	<script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/bootstrap-validator/0.4.5/js/bootstrapvalidator.min.js'></script>
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/controllers/loginCtrl.js"></script>
	<script type="text/javascript" src="js/controllers/homeCtrl.js"></script>
	<script type="text/javascript" src="js/services/loginService.js"></script>
	<script type="text/javascript" src="js/services/sessionService.js"></script>
	
</html>