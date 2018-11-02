<?php
	session_start();
	include('database_connection.php');

	$output = array();
	$sql = "SELECT id, name, address,type, active FROM branches_list WHERE active=1 and created_by='".$_SESSION['uid']."' ORDER BY type DESC";
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}

	echo json_encode($output);
?>