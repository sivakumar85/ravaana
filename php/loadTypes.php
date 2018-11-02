<?php
	session_start();
	include('database_connection.php');

	$output = array();
	//$sql = "SELECT * FROM members WHERE memid = '".$_SESSION['uid']."'";
	$sql = "SELECT id, load_type, display_order, active FROM load_type WHERE active=1 ORDER BY display_order";
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}

	echo json_encode($output);
?>