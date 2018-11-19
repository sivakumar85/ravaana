<?php
error_reporting(E_ALL & ~E_NOTICE);
	session_start();
	
	$form_data = json_decode(file_get_contents('php://input'));
	//print_r($form_data);print_r($_POST);
	//echo $_FILES['image1']['name'];
	$format = 'd/m/Y';
	if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "getTrucksList"){
			$response = getTrucksList($form_data);
			echo $response;
		} else if($action == "updateTruckStatus"){
			$response = updateTruckStatus($form_data);
			echo $response;
		} else if($action == "deleteTruck"){
			$response = deleteTruck($form_data);
			echo $response;
		} else if($action == "updateTruck"){
			$response = updateTruck($form_data);
			echo $response;
		} else if($action == "updateProfile"){
			$response = updateProfile($form_data);
			echo $response;
		}
	}  
	function getTrucksList($form_data){  
	     include('database_connection.php'); 
	     $output = array();  
		$sql = "SELECT id, uid, vehicle_registration_no, vehicle_type, truck_capacity, 			truck_rc, truck_insurence, truck_pollution, truck_image, 
			driver_aadhar_number,aadhar_copy,truck_fitness_certificate, active, created_by, 
			created_date, modified_by,modified_date 
				FROM trucks_list
				WHERE created_by='".$_SESSION['uid']."'";
		
		//echo $_GET['id'];
		if(isset($_GET['id'])) {
			$sql.= " AND id='".$_GET['id']."'";
		}  
		if(!empty($form_data->vehicle_registration_no))
		{
		 	$sql.= " AND vehicle_registration_no like'%".$form_data->vehicle_registration_no."%'"; 
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

	function updateTruckStatus($data){
		include('database_connection.php'); 
	     $output = array(); 
		if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $status = $data->active;
		      $query = "UPDATE trucks_list set active='$status', modified_date=CURRENT_TIMESTAMP,modified_by='".$_SESSION['uid']."' WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		          $message =  "Truck status updated successfully..";
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

	function deleteTruck($data ){
		 include('database_connection.php'); 
		 $output = array(); 
		 $message = '';
		 $error = '';
		 if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $driver_photo = '';
		      $driver_license = '';
		      $sel_query = "SELECT id,truck_rc, truck_insurence, truck_pollution, 					  truck_image,truck_fitness_certificate 
							FROM trucks_list  WHERE id='$id'";
		      $q=$conn->query($sel_query);
			  while($row=$q->fetch_array()){
			  	if(isset($row['truck_rc'])){
			  		$truck_rc = $row['truck_rc'];
			  	}
			  	if(isset($row['truck_insurence'])){
			  		$truck_insurence = $row['truck_insurence'];
			  	}
			  	if(isset($row['truck_pollution'])){
			  		$truck_pollution = $row['truck_pollution'];
			  	}
			  	if(isset($row['truck_image'])){
			  		$truck_image = $row['truck_image'];
			  	}
			  	if(isset($row['truck_fitness_certificate'])){
			  		$truck_fitness_certificate = $row['truck_fitness_certificate'];
			  	}
			  }
		      $query = "DELETE FROM trucks_list WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		      	if (file_exists('upload/'.$truck_rc)) {
    				unlink('upload/'.$truck_rc);
    			}
    			if (file_exists('upload/'.$truck_pollution)) {
    				unlink('upload/'.$truck_pollution);
    			}
    			if (file_exists('upload/'.$truck_insurence)) {
    				unlink('upload/'.$truck_insurence);
    			}
    			if (file_exists('upload/'.$truck_image)) {
    				unlink('upload/'.$truck_image);
    			}
    			if (file_exists('upload/'.$truck_fitness_certificate)) {
    				unlink('upload/'.$truck_fitness_certificate);
    			}

		          $message =  "Truck deleted successfully..";
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

	function updateTruck($form_data){
		include('database_connection.php'); 
		$form_data = json_decode($_POST['model']);
		//echo $form_data->driver_name;
		//print_r($form_data);
	    $output = array();  
		$message = '';
		$error = '';
		
		if(empty($form_data->vehicle_registration_no))
		{
		 $error.= 'vehicle_registration_no is Required'."<br>";
		}
		else
		{
		 $vehicle_registration_no = $form_data->vehicle_registration_no;
		}
		if(empty($form_data->vehicle_type))
		{
		 $error.= 'vehicle_type is Required'."<br>";
		}
		else
		{
		 $vehicle_type = $form_data->vehicle_type;
		}
		if(empty($form_data->truck_capacity))
		{
		 $error.= 'truck_capacity is Required'."<br>";
		}
		else
		{
		 $truck_capacity = $form_data->truck_capacity;
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
		    if(file_exists($_FILES['truck_rc']['tmp_name']) || is_uploaded_file($_FILES['truck_rc']['tmp_name'])) {
		    	$ext = pathinfo($_FILES['truck_rc']['name'],PATHINFO_EXTENSION);
		    	$truck_rc = time().date("dmY").'1'.'.'.$ext;
			}
			if(file_exists($_FILES['truck_insurence']['tmp_name']) || is_uploaded_file($_FILES['truck_insurence']['tmp_name'])) {
		    	$ext2= pathinfo($_FILES['truck_insurence']['name'],PATHINFO_EXTENSION);			
				$truck_insurence = time().date("dmY").'2'.'.'.$ext2;
			}
			if(file_exists($_FILES['truck_pollution']['tmp_name']) || is_uploaded_file($_FILES['truck_pollution']['tmp_name'])) {
		    	$ext3 = pathinfo($_FILES['truck_pollution']['name'],PATHINFO_EXTENSION);
		    	$truck_pollution = time().date("dmY").'3'.'.'.$ext3;
			}
			if(file_exists($_FILES['truck_image']['tmp_name']) || is_uploaded_file($_FILES['truck_image']['tmp_name'])) {
		    	$ext4= pathinfo($_FILES['truck_image']['name'],PATHINFO_EXTENSION);			
				$truck_image = time().date("dmY").'4'.'.'.$ext4;
			}
			if(file_exists($_FILES['truck_fitness_certificate']['tmp_name']) || is_uploaded_file($_FILES['truck_fitness_certificate']['tmp_name'])) {
		    	$ext5= pathinfo($_FILES['truck_fitness_certificate']['name'],PATHINFO_EXTENSION);			
				$truck_fitness_certificate = time().date("dmY").'5'.'.'.$ext5;
			}
		    
			
			if(!empty($form_data->id)){
				$id = $form_data->id;
				$sel_query = "SELECT id,truck_rc, truck_insurence, truck_pollution, 				  truck_image,truck_fitness_certificate 
							  FROM trucks_list 
							  WHERE id='$id'";
				$q=$conn->query($sel_query);
				while($row=$q->fetch_array()){
					if(isset($row['truck_rc'])){
						$image1 = $row['truck_rc'];
					}
					if(isset($row['truck_insurence'])){
						$image2 = $row['truck_insurence'];
					}
					if(isset($row['truck_pollution'])){
						$image3 = $row['truck_pollution'];
					}
					if(isset($row['truck_image'])){
						$image4 = $row['truck_image'];
					}
					if(isset($row['truck_fitness_certificate'])){
						$image5 = $row['truck_fitness_certificate'];
					}
				}
				$query = "UPDATE trucks_list 
						  SET vehicle_registration_no='$vehicle_registration_no',vehicle_type='$vehicle_type',truck_capacity='$truck_capacity', modified_by='$uid',modified_date=CURRENT_TIMESTAMP";
				if(isset($truck_rc)){
					$query.=  " ,truck_rc='$truck_rc'";
				}
				if(isset($truck_insurence)){
					$query.=  " ,truck_insurence='$truck_insurence'";
				}
				if(isset($truck_pollution)){
					$query.=  " ,truck_pollution='$truck_pollution'";
				}
				if(isset($truck_image)){
					$query.=  " ,truck_image='$truck_image'";
				}
				if(isset($truck_fitness_certificate)){
					$query.=  " ,truck_fitness_certificate='$truck_fitness_certificate'";
				}
				$query.=  " WHERE id='$id'";
			} else {
				$data = [];
				$data["uid"] = $uid;
				$data["vehicle_registration_no"] = $vehicle_registration_no;
				$data["vehicle_type"] = $vehicle_type;
				$data["truck_capacity"] = $truck_capacity;
				$data["active"] = 1;
				$data["created_by"] = $uid;
				
				if(isset($truck_rc)){
					$data["truck_rc"] = $truck_rc;
				}
				if(isset($truck_insurence)){
					$data["truck_insurence"] = $truck_insurence;
				}
				if(isset($truck_pollution)){
					$data["truck_pollution"] = $truck_pollution;
				}
				if(isset($truck_image)){
					$data["truck_image"] = $truck_image;
				}
				if(isset($truck_fitness_certificate)){
					$data["truck_fitness_certificate"] = $truck_fitness_certificate;
				}
				$table = 'trucks_list';
				$key = array_keys($data);
			    $val = array_values($data);
			    $query = "INSERT INTO $table (" . implode(', ', $key) . ") "
			         . "VALUES ('" . implode("', '", $val) . "')";	
				/*$query = "INSERT INTO trucks_list (uid, driver_name, driver_age, driver_license_number, driver_mobile, driver_address, driver_photo, driver_license, active, created_by) VALUES ('$uid', '$driver_name', '$driver_age', '$driver_license_number', '$driver_mobile', '$driver_address', '$image', '$image2',1, '$uid') ";*/
			}
			//echo $query;
			 if ($conn->query($query) === TRUE) {
			 	if (file_exists('upload/'.$image1) && isset($truck_rc)) {
    				unlink('upload/'.$image1);
    			}
    			if (file_exists('upload/'.$image2) && isset($truck_insurence)) {
    				unlink('upload/'.$image2);
    			}
    			if (file_exists('upload/'.$image3) && isset($truck_pollution)) {
    				unlink('upload/'.$image3);
    			}
    			if (file_exists('upload/'.$image4) && isset($truck_image)) {
    				unlink('upload/'.$image4);
    			}
    			if (file_exists('upload/'.$image5) && isset($truck_fitness_certificate)) {
    				unlink('upload/'.$image5);
    			}
			 	if(isset($truck_rc)){
			 		move_uploaded_file($_FILES["truck_rc"]["tmp_name"], 'upload/'.$truck_rc);
			 	}
			 	if(isset($truck_insurence)){
                	move_uploaded_file($_FILES["truck_insurence"]["tmp_name"], 'upload/'.$truck_insurence);
                }
                if(isset($truck_pollution)){
			 		move_uploaded_file($_FILES["truck_pollution"]["tmp_name"], 'upload/'.$truck_pollution);
			 	}
			 	if(isset($truck_image)){
                	move_uploaded_file($_FILES["truck_image"]["tmp_name"], 'upload/'.$truck_image);
                }
                if(isset($truck_fitness_certificate)){
                	move_uploaded_file($_FILES["truck_fitness_certificate"]["tmp_name"], 'upload/'.$truck_fitness_certificate);
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