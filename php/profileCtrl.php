<?php
error_reporting(E_ALL & ~E_NOTICE);
session_start();
$form_data = json_decode(file_get_contents('php://input'));
if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "updateProfile"){
			$response = updateProfile($form_data);
			echo $response;
		} else if($action == "fetchProfile"){
			$response = fetchProfile();
			echo $response;
		} else if($action == "fetch"){
			$response = fetch();
			echo $response;
		} else if($action == "changePassword"){
			$response = changePassword($form_data);
			echo $response;
		} else if($action == "updateLoginDetails"){
			$response = updateLoginDetails($form_data);
			echo $response;
		}
	}  

	 function fetch() {
	 	include('database_connection.php');

		$output = array();
		//$sql = "SELECT * FROM members WHERE memid = '".$_SESSION['uid']."'";
		$sql = "SELECT uid, business_type, name, email, mobile, active, profile_complete, verified FROM user  WHERE uid = '".$_SESSION['uid']."'";
		//echo $sql;
		$query=$conn->query($sql);
		while($row=$query->fetch_array()){
			$output[] = $row;
		}

		return json_encode($output);
	 }
     
    function fetchProfile() {
    	include('database_connection.php');
		$output = array();		
		$sql = "SELECT user.uid, user.business_type, user.name, user.email, user.mobile,
				user_profile.id,user_profile.aadhar_number, user_profile.panCard_number, 
				user_profile.company_name,user_profile.profile_pic, user_profile.aadhar_copy, 
				user_profile.company_certificate, user_profile.company_panCard, 
				user_profile.driving_license_number,user_profile.driving_license_copy 
				FROM user  
				INNER JOIN user_profile ON user.uid=user_profile.uid
				WHERE user.uid = '".$_SESSION['uid']."'";
		//echo $sql;
		$query=$conn->query($sql);
		while($row=$query->fetch_array()){
			$output[] = $row;
		}
		return json_encode($output);
    }

    function changePassword($form_data){
		include('database_connection.php'); 
	    $output = array();  
		$message = '';
		$error = '';
		

		if(empty($form_data->user_current_password))
		{
		 $error.= 'user_current_password is Required'."<br>";
		}
		else
		{
		 $user_current_password = $form_data->user_current_password;
		}
		if(empty($form_data->user_new_password))
		{
		 $error.= 'user_new_password is Required'."<br>";
		}
		else
		{
		 $user_new_password = $form_data->user_new_password;
		}
		if(empty($form_data->user_confirm_password))
		{
		 $error.= 'user_confirm_password is Required'."<br>";
		}
		else
		{
		 $user_confirm_password = $form_data->user_confirm_password;
		}
		

		if(empty($error))
		{
		    
		    $uid = $_SESSION['uid'];
		    $pquery = "SELECT uid FROM user  WHERE password ='$user_current_password' and uid='$uid'";
		    //echo $pquery;
		    $sResult = $conn->query($pquery);

			if ($sResult->num_rows > 0) {
				$query = "UPDATE user SET password='$user_new_password',modified_by='$uid', 
						  modified_date=CURRENT_TIMESTAMP
						  WHERE uid='$uid'";
				if ($conn->query($query) === TRUE) {
				    $message = "Password changed successfully..Please Login with new one..";
					
				} else {
				    $error.= "Error: " . $conn->error."<br>";
				}
			} else {
				$error.= "Old password is wrong..<br>";
			}
		}

		//echo $error;

		$output = array(
		 'error'  => $error,
		 'message' => $message
		);

		return json_encode($output);

	}

	function updateLoginDetails($form_data){
		include('database_connection.php'); 
	    $output = array();  
		$message = '';
		$error = '';
		

		if(empty($form_data->update_email))
		{
		 $error.= 'update_email is Required'."<br>";
		}
		else
		{
		 $update_email = $form_data->update_email;
		}
		if(empty($form_data->update_mobile))
		{
		 $error.= 'update_mobile is Required'."<br>";
		}
		else
		{
		 $update_mobile = $form_data->update_mobile;
		}
		if(isset($_SESSION['otp'])){
			if(empty($form_data->update_otp))
			{
			 $error.= 'update_otp is Required'."<br>";
			}
			else
			{
			 $update_otp = $form_data->update_otp;
			}
		}
		
		

		if(empty($error))
		{
		    
		    $uid = $_SESSION['uid'];
		    if(isset($_SESSION['otp'])) {
		    	if($update_otp == $_SESSION['otp']) {
		    		$query = "UPDATE user SET email='$update_email',mobile='$update_mobile',
		    			  modified_by='$uid',modified_date=CURRENT_TIMESTAMP
							  WHERE uid='$uid'";
					if ($conn->query($query) === TRUE) {
					    $message = "Email/Mobile changed successfully..Please Login with new one..";
						
					} else {
					    $error.= "Error: " . $conn->error."<br>";
					}
		    	} else {
		    		$error.= "Incorrect OTP<br>";
		    	}
		    	
		    }
		    else {
		    	$_SESSION['otp'] = 1234;
		    	$message = "OTP Sent Successfully..";
		    }
		    
		}

		//echo $error;

		$output = array(
		 'error'  => $error,
		 'message' => $message
		);

		return json_encode($output);

	}

	function updateProfile($form_data){
		include('database_connection.php'); 
		$form_data = json_decode($_POST['model']);
		//echo $form_data->driver_name;
		//print_r($form_data);
	    $output = array();  
		$message = '';
		$error = '';
		
		if(empty($form_data->name))
		{
		 $error.= 'name is Required'."<br>";
		}
		else
		{
		 $name = $form_data->name;
		}
		if(empty($form_data->aadhar_number))
		{
		 $error.= 'aadhar_number is Required'."<br>";
		}
		else
		{
		 $aadhar_number = $form_data->aadhar_number;
		}
		if($_SESSION['business_type'] == 'TruckOwner') {
			if(empty($form_data->driving_license_number))
			{
			 $error.= 'driving_license_number is Required'."<br>";
			}
			else
			{
			 $driving_license_number = $form_data->driving_license_number;
			}
		}
		
		if($_SESSION['business_type'] == 'TransportCompany') {
			if(empty($form_data->panCard_number))
			{
			 $error.= 'panCard_number is Required'."<br>";
			}
			else
			{
			 $panCard_number = $form_data->panCard_number;
			}
			if(empty($form_data->company_name))
			{
			 $error.= 'company_name is Required'."<br>";
			}
			else
			{
			 $company_name = $form_data->company_name;
			}
		}
		
		/*if(!empty($_FILES['image1'])&&!empty($_FILES['image2']))
		{
			if (($_FILES["image1"]["error"] > 0)&&($_FILES["image2"]["error"] > 0))
				{
	            		$error.= "File is error"."<br>"; 
	        	}
			/*if ((($_FILES["image1"]["type"] == "image/png")&&($_FILES["image2"]["type"] == "image/png") || ($_FILES["image1"]["type"] == "image/jpg")&&($_FILES["image2"]["type"] == "image/jpg") || ($_FILES["image1"]["type"] == "image/gif")&&($_FILES["image2"]["type"] == "image/gif") || ($_FILES["image1"]["type"] == "image/jpeg")&&($_FILES["image2"]["type"] == "image/jpeg"))) 
			{
				if (($_FILES["image1"]["error"] > 0)&&($_FILES["image2"]["error"] > 0))
				{
	            		$error.= "File is error"."<br>"; 
	        	}
				
	        		 
			} 
			else
			{
				$error.= "file must be in jpeg, jpg, png, gif<br>";
			}
		}
		else
		{
			$error.= "Image Is Empty";
		}*/

		if(empty($error))
		{
		    
		    $uid = $_SESSION['uid'];
		    if(file_exists($_FILES['profile_pic']['tmp_name']) || is_uploaded_file($_FILES['profile_pic']['tmp_name'])) {
		    	$ext = pathinfo($_FILES['profile_pic']['name'],PATHINFO_EXTENSION);
		    	$profile_pic = time().date("dmY").'1'.'.'.$ext;
			}
			if(file_exists($_FILES['driving_license_copy']['tmp_name']) || is_uploaded_file($_FILES['driving_license_copy']['tmp_name'])) {
		    	$ext2= pathinfo($_FILES['driving_license_copy']['name'],PATHINFO_EXTENSION);			
				$driving_license_copy = time().date("dmY").'2'.'.'.$ext2;
			}
			if(file_exists($_FILES['aadhar_copy']['tmp_name']) || is_uploaded_file($_FILES['aadhar_copy']['tmp_name'])) {
		    	$ext3 = pathinfo($_FILES['aadhar_copy']['name'],PATHINFO_EXTENSION);
		    	$aadhar_copy = time().date("dmY").'3'.'.'.$ext3;
			}
			if(file_exists($_FILES['company_panCard']['tmp_name']) || is_uploaded_file($_FILES['company_panCard']['tmp_name'])) {
		    	$ext4 = pathinfo($_FILES['company_panCard']['name'],PATHINFO_EXTENSION);
		    	$company_panCard = time().date("dmY").'3'.'.'.$ext4;
			}
			if(file_exists($_FILES['company_certificate']['tmp_name']) || is_uploaded_file($_FILES['company_certificate']['tmp_name'])) {
		    	$ext5 = pathinfo($_FILES['company_certificate']['name'],PATHINFO_EXTENSION);
		    	$company_certificate = time().date("dmY").'3'.'.'.$ext5;
			}
			
			
		    
			
			if(!empty($form_data->id)){
				$id = $form_data->id;
				$sel_query = "SELECT id,aadhar_copy, driving_license_copy, profile_pic, 	
							  company_certificate, company_panCard  
							  FROM user_profile  
							  WHERE id='$id'";
				$q=$conn->query($sel_query);
				while($row=$q->fetch_array()){
					if(isset($row['profile_pic'])){
						$image1 = $row['profile_pic'];
					}
					if(isset($row['driving_license_copy'])){
						$image2 = $row['driving_license_copy'];
					}
					if(isset($row['aadhar_copy'])){
						$image3 = $row['aadhar_copy'];
					}
					if(isset($row['company_certificate'])){
						$image4 = $row['company_certificate'];
					}
					if(isset($row['company_panCard'])){
						$image5 = $row['company_panCard'];
					}
					
				}
				$query = "UPDATE user_profile 
						  SET aadhar_number='$aadhar_number', modified_by='$uid',modified_date=CURRENT_TIMESTAMP";
				
				if($_SESSION['business_type'] == 'TransportCompany') {
					$query.=  " ,company_name='$company_name',panCard_number='$panCard_number' ";
				}
				if($_SESSION['business_type'] == 'TruckOwner') {
					$query.=  " ,driving_license_number='$driving_license_number'";
				}
				if(isset($aadhar_copy)){
					$query.=  " ,aadhar_copy='$aadhar_copy'";
				}
				if(isset($driving_license_copy)){
					$query.=  " ,driving_license_copy='$driving_license_copy'";
				}
				if(isset($profile_pic)){
					$query.=  " ,profile_pic='$profile_pic'";
				}
				if(isset($company_certificate)){
					$query.=  " ,company_certificate='$company_certificate'";
				}
				if(isset($company_panCard)){
					$query.=  " ,company_panCard='$company_panCard'";
				}
				
				$query.=  " WHERE id='$id'";
			} else {
				$data = [];
				$data["uid"] = $uid;
				if($_SESSION['business_type'] == 'TransportCompany') {
					$data["company_name"] = $company_name;
					$data["panCard_number"] = $panCard_number;
				}
				if($_SESSION['business_type'] == 'TruckOwner') {
					$data["driving_license_number"] = $driving_license_number;
				}
				$data["aadhar_number"] = $aadhar_number;
				$data["created_by"] = $uid;
				
				if(isset($profile_pic)){
					$data["profile_pic"] = $profile_pic;
				}
				if(isset($driving_license_copy)){
					$data["driving_license_copy"] = $driving_license_copy;
				}
				if(isset($aadhar_copy)){
					$data["aadhar_copy"] = $aadhar_copy;
				}
				if(isset($company_certificate)){
					$data["company_certificate"] = $company_certificate;
				}
				if(isset($company_panCard)){
					$data["company_panCard"] = $company_panCard;
				}
				
				$table = 'user_profile';
				$key = array_keys($data);
			    $val = array_values($data);
			    $query = "INSERT INTO $table (" . implode(', ', $key) . ") "
			         . "VALUES ('" . implode("', '", $val) . "')";	
				
			}
			//echo $query;
			 if ($conn->query($query) === TRUE) {
			 	if(empty($form_data->id)){
				 	$sql = "UPDATE user SET profile_complete= 1 WHERE uid='$uid'";
					if ($conn->query($sql) === TRUE) {
						$message = 'Profile Updated';
					} else {
						$error.= 'Not Updated'.$conn->error.'<br>';
					}
				}
			 	if (file_exists('upload/'.$image1) && isset($profile_pic)) {
    				unlink('upload/'.$image1);
    			}
    			if (file_exists('upload/'.$image2) && isset($driving_license_copy)) {
    				unlink('upload/'.$image2);
    			}
    			if (file_exists('upload/'.$image3) && isset($aadhar_copy)) {
    				unlink('upload/'.$image3);
    			}
    			if (file_exists('upload/'.$image4) && isset($company_certificate)) {
    				unlink('upload/'.$image4);
    			}
    			if (file_exists('upload/'.$image5) && isset($company_panCard)) {
    				unlink('upload/'.$image5);
    			}
    			
			 	if(isset($profile_pic)){
			 		move_uploaded_file($_FILES["profile_pic"]["tmp_name"], 'upload/'.$profile_pic);
			 	}
			 	if(isset($driving_license_copy)){
                	move_uploaded_file($_FILES["driving_license_copy"]["tmp_name"], 'upload/'.$driving_license_copy);
                }
                if(isset($aadhar_copy)){
			 		move_uploaded_file($_FILES["aadhar_copy"]["tmp_name"], 'upload/'.$aadhar_copy);
			 	}
			 	if(isset($company_certificate)){
			 		move_uploaded_file($_FILES["company_certificate"]["tmp_name"], 'upload/'.$company_certificate);
			 	}
			 	if(isset($company_panCard)){
			 		move_uploaded_file($_FILES["company_panCard"]["tmp_name"], 'upload/'.$company_panCard);
			 	}
			 	
			 	 $message = $form_data->id!=null?"record updated successfully":"New record created successfully";
				
			} else {
			    $error.= "Error: " . $conn->error."<br>";
			}
		}

		//echo $error;

		$output = array(
		 'error'  => $error,
		 'message' => $message
		);

		return json_encode($output);

	}
?>