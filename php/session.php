<?php
	session_start();
	if(isset($_SESSION['uid'])){
		echo 1;
	} else{
		echo 0;
	}
?>