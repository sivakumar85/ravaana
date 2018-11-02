<?php

//register.php
session_start();
include('database_connection.php');
$message = '';
$error = '';
try{
	$form_data = json_decode(file_get_contents('php://input'));


	//print_r($form_data);
	

	if(empty($form_data->utype))
	{
	 $error.= 'Business Type is Required'."<br>";
	}
	else
	{
	 $business_type = $form_data->utype;
	}
	if(empty($form_data->fullname))
	{
	 $error.= 'Name is Required'."<br>";
	}
	else
	{
	 $name = $form_data->fullname;
	}

	if(empty($form_data->mobile))
	{
	 $error.= 'mobile is Required'."<br>";
	}
	else
	{
	 $mobile = $form_data->mobile;
	}


	if(empty($form_data->email))
	{
	 $error.= 'Email is Required'."<br>";
	}
	else
	{
	 if(!filter_var($form_data->email, FILTER_VALIDATE_EMAIL))
	 {
	  $error.= 'Invalid Email Format'."<br>";
	 }
	 else
	 {
	  $email = $form_data->email;
	 }
	}

	if(empty($form_data->password))
	{
	 $error.= 'Password is Required'."<br>";
	}
	else
	{
	 $password = $form_data->password;//password_hash($form_data->password, PASSWORD_DEFAULT);
	}
	$verification_code = 1234;//rand(1000, 9999);
	if(empty($error))
	{
	    //echo $business_type;  echo $name;   echo $email;  echo $mobile;  echo $password;
	 $selectQuery = "SELECT uid FROM user  WHERE (email='$email' || mobile='$mobile')";
	 $sResult = $conn->query($selectQuery);

	if ($sResult->num_rows > 0) {
		$error.= "Email/Mobile already Exists..<br>";
	}
	else{
		$query = "INSERT INTO user (business_type, name, email, mobile, password, verification_code, active, profile_complete,verified) VALUES ('$business_type', '$name',  '$email', '$mobile', '$password', '$verification_code', 1, 0,0) ";
		 if ($conn->query($query) === TRUE) {
		    $message = "New record created successfully";
			$last_id = $conn->insert_id;
			$_SESSION['userid'] = $last_id;
			$_SESSION['verification_code'] = $verification_code;
			$_SESSION['business_type'] = $business_type;
		} else {
		    $error.= "Error: " . $conn->error."<br>";
		}
	}
	 
	}
} catch(Exception $e) {
  $error.= 'Error: ' .$e->getMessage();
}
//echo $error;

$output = array(
 'error'  => $error,
 'message' => $message
);

echo json_encode($output);
?>