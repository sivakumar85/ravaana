<?php
	session_start();
	
	$form_data = json_decode(file_get_contents('php://input'));
	//print_r($form_data);print_r($_POST);
	//echo $_FILES['image1']['name'];
	$format = 'd/m/Y';
	if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "getDriversList"){
			$response = getDriversList($form_data);
			echo $response;
		} else if($action == "updateDriverStatus"){
			$response = updateDriverStatus($form_data);
			echo $response;
		} else if($action == "deleteDriver"){
			$response = deleteDriver($form_data);
			echo $response;
		} else if($action == "updateDriver"){
			$response = updateDriver($form_data);
			echo $response;
		}
	}  
	function getDriversList($form_data){  
	     include('database_connection.php'); 
	     $output = array();  
		$sql = "SELECT id, uid, driver_name, driver_age, driver_license_number, driver_mobile, 		driver_address, driver_photo, driver_license, active, created_by, 				 created_date 
				FROM drivers_list
				WHERE created_by='".$_SESSION['uid']."'";
		
		//echo $_GET['id'];
		if(isset($_GET['id'])) {
			$sql.= " AND id='".$_GET['id']."'";
		}  
		if(!empty($form_data->driver_name))
		{
		 	$sql.= " AND driver_name like'%".$form_data->driver_name."%'"; 
		}
		
		//echo $sql;
		$query=$conn->query($sql);
		while($row=$query->fetch_array()){
			$new_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["created_date"] );
			$row["created_date"] =  $new_datetime->format('d F Y, h:i:s A');
			if(isset($row["modified_date"]) && $row["modified_date"]!=null){
				$modified_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["modified_date"] );
			$row["modified_date"] =  $modified_datetime->format('d F Y, h:i A');
			}
			$row["active"] = ($row["active"] == 1) ? true: false;
			$output[] = $row;
		}

		return json_encode($output);
	       
	}  

	function updateDriverStatus($data){
		include('database_connection.php'); 
	     $output = array(); 
		if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $status = $data->active;
		      $query = "UPDATE drivers_list set active='$status', modified_date=CURRENT_TIMESTAMP,modified_by='".$_SESSION['uid']."' WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		          $message =  "Driver updated successfully..";
		      } else {
		          $error.= "Error: " . $conn->error."<br>";
		      }

		 } 
		 $output = array(
		 'error'  => $error,
		 'message' => $message
		);

		return json_encode($output); 
	}

	function deleteDriver($data ){
		 include('database_connection.php'); 
		 $output = array(); 
		 $message = '';
		 $error = '';
		 if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $query = "DELETE FROM drivers_list WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		          $message =  "Driver deleted successfully..";
		      } else {
		          $error.= "Error: " . $conn->error."<br>";
		      }

		 } 
		 $output = array(
		 'error'  => $error,
		 'message' => $message
		);

		return json_encode($output);
	}

	function updateDriver($form_data){
		include('database_connection.php'); 
		$form_data = json_decode($_POST['model']);
		echo $form_data->driver_name;
		//print_r($form_data);
	    $output = array();  
		$message = '';
		$error = '';
		
		if(empty($form_data->driver_name))
		{
		 $error.= 'name is Required'."<br>";
		}
		else
		{
		 $driver_name = $form_data->driver_name;
		}
		if(empty($form_data->driver_age))
		{
		 $error.= 'driver_age is Required'."<br>";
		}
		else
		{
		 $driver_age = $form_data->driver_age;
		}
		if(empty($form_data->driver_license_number))
		{
		 $error.= 'driver_license_number is Required'."<br>";
		}
		else
		{
		 $driver_license_number = $form_data->driver_license_number;
		}
		if(empty($form_data->driver_mobile))
		{
		 $error.= 'driver_mobile is Required'."<br>";
		}
		else
		{
		 $driver_mobile = $form_data->driver_mobile;
		}if(empty($form_data->driver_address))
		{
		 $error.= 'driver_address is Required'."<br>";
		}
		else
		{
		 $driver_address = $form_data->driver_address;
		}
		if(!empty($_FILES['image1'])&&!empty($_FILES['image2']))
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
			}*/
		}
		else
		{
			$error.= "Image Is Empty";
		}

		if(empty($error))
		{
		    
		    $uid = $_SESSION['uid'];
			/*if(!empty($form_data->id)){
				$id = $form_data->id;
				$query = "UPDATE drivers_list 
						  SET driver_name='$driver_name',driver_age='$driver_age',driver_license_number='$driver_license_number',driver_mobile='$driver_mobile',driver_address='$driver_address',driver_photo='$image', driver_license='$image2',  modified_by='$uid',modified_date=CURRENT_TIMESTAMP
						  WHERE id='$id'";
			} else {*/
				$ext = pathinfo($_FILES['image1']['name'],PATHINFO_EXTENSION);
				$ext2= pathinfo($_FILES['image2']['name'],PATHINFO_EXTENSION);
				$image = time().date("dmY").'1'.'.'.$ext;
				$image2 = time().date("dmY").'2'.'.'.$ext2;
				
			   
                	
			 $query = "INSERT INTO drivers_list (uid, driver_name, driver_age, driver_license_number, driver_mobile, driver_address, driver_photo, driver_license, active, created_by) VALUES ('$uid', '$driver_name', '$driver_age', '$driver_license_number', '$driver_mobile', '$driver_address', '$image', '$image2',1, '$uid') ";
			//}
			echo $query;
			 if ($conn->query($query) === TRUE) {
			 	move_uploaded_file($_FILES["image1"]["tmp_name"], 'upload/'.$image);
                move_uploaded_file($_FILES["image2"]["tmp_name"], 'upload/'.$image2);
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