<?php
	session_start();
	if(isset($_SESSION['business_type'])){
		echo $_SESSION['business_type'];
	} else{
		echo null;
	}
?>