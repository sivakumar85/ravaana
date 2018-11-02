<?php
	session_start();
	include('database_connection.php');

	$output = array();
	//$sql = "SELECT * FROM members WHERE memid = '".$_SESSION['uid']."'";
	$sql = "SELECT uid, business_type, name, email, mobile, active, profile_complete, verified FROM user  WHERE uid = '".$_SESSION['uid']."'";
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}

	echo json_encode($output);
?>