<?php
include('database_connection.php');
if(isset($_POST['emailId'])){
	$query = "SELECT uid FROM user  WHERE email = '".$_POST['emailId']."' ";
}
if(isset($_POST['mobile'])){
	$query = "SELECT uid FROM user  WHERE mobile = '".$_POST['mobile']."' ";
}
 $sResult = $conn->query($query);

	if ($sResult->num_rows == 0) {
		$json['valid'] = true;
	}
	else
	{
	    $json['valid'] = false;
	}

echo json_encode($json);
?>