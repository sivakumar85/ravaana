<?php
include('database_connection.php');
if(isset($_POST['emailId'])){
	$query = "SELECT uid FROM user  WHERE email = '".$_POST['emailId']."' ";
}
if(isset($_POST['mobile'])){
	$query = "SELECT uid FROM user  WHERE mobile = '".$_POST['mobile']."' ";
}
if(isset($_POST['user_current_password'])){
	$query = "SELECT uid FROM user  WHERE password = '".$_POST['user_current_password']."' ";
}
 $sResult = $conn->query($query);

	if ($sResult->num_rows == 0) {
		$json['valid'] = isset($_POST['user_current_password']) ? false : true;
	}
	else
	{
	    $json['valid'] = isset($_POST['user_current_password']) ? true : false;
	}

echo json_encode($json);
?>