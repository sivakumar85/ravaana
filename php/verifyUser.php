<?php

session_start();
	

include('database_connection.php');

$out = array('error' => false);

$user = json_decode(file_get_contents('php://input'));

$verification_code = $user->verification_code;
$company_address = $user->company_address;
$company_name = $user->company_name;
$userId = $_SESSION['userid'];

$sql = "SELECT uid, business_type,  verification_code FROM user  WHERE verification_code='$verification_code' AND uid='$userId'";
//echo $sql;
$query = $conn->query($sql);

if($query->num_rows>0){
	$row = $query->fetch_array();
	
	$sql = "UPDATE user SET verified= 1,company_name='$company_name' WHERE uid='$userId'";
	$insertSql = "INSERT INTO branches_list(name, type, address, active,created_by) VALUES ('$company_name', 'Company','$company_address',1,'$userId')";

	if ($conn->query($sql) === TRUE) {
		if ($conn->query($insertSql) === TRUE) {
			$out['message'] = 'Verified';
			session_destroy();
			session_commit();
		}
		else{
			$out['error'] = "Error updating record: " . $conn->error;
		}
	} else {
		$out['error'] = "Error updating record: " . $conn->error;
	}
	
	
}
else{
	$out['error'] = 'Invalid Verification Code';
	$out['message'] = '';
}

echo json_encode($out);

?>