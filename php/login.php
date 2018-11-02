<?php

session_start();
	

include('database_connection.php');

$out = array('error' => false);

$user = json_decode(file_get_contents('php://input'));

$username = $user->username;
$password = $user->password;

$sql = "SELECT uid, business_type, name, email, mobile, password, verification_code, active, profile_complete, verified FROM user  WHERE (email='$username' || mobile='$username') AND password='$password'";
$query = $conn->query($sql);

if($query->num_rows>0){
	$row = $query->fetch_array();
	if($row['active'] == 1) {
		if($row['verified'] == 1) {
			$out['message'] = 'Login Successful';
			$out['uid'] = $row['uid'];
			$out['business_type'] = $row['business_type'];
			$out['username'] = $row['name'];
			$out['profile_complete'] = $row['profile_complete'];			
			$_SESSION['uid'] = $row['uid'];
			$_SESSION['username'] = $row['name'];
			$_SESSION['business_type'] = $row['business_type'];
		} else{
			$out['error'] = true;
			$out['message'] = 'Email/Mobile Not Verified';
		}
		
	} else{
		$out['error'] = true;
		$out['message'] = 'User Inactive Contact Admin';
	}
	
}
else{
	$out['error'] = true;
	$out['message'] = 'Invalid Login';
}

echo json_encode($out);

?>