<?php
	session_start();
	include('database_connection.php');

	$output = array();
	
	$sql = "SELECT user.uid, user.business_type, user.name, user.email, user.mobile,user_profile.id,	user_profile.aadhar_number, user_profile.panCard_number, user_profile.company_name, 		user_profile.profile_pic, user_profile.aadhar_copy, user_profile.company_certificate, 		user_profile.company_panCard,user_profile.driving_license_number,
			user_profile.driving_license_copy 
			FROM user  
			INNER JOIN user_profile ON user.uid=user_profile.uid
			WHERE user.uid = '".$_SESSION['uid']."'";
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		$output[] = $row;
	}

	echo json_encode($output);
?>