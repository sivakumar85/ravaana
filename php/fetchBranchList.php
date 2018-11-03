<?php
	session_start();
	
	$form_data = json_decode(file_get_contents('php://input'));
	//print_r($form_data);
	$format = 'd/m/Y';
	if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "getBranchList"){
			$response = getBranchList($form_data);
			echo $response;
		} else if($action == "updateBranchStatus"){
			$response = updateBranchStatus($form_data);
			echo $response;
		} else if($action == "deleteBranch"){
			$response = deleteBranch($form_data);
			echo $response;
		} else if($action == "updateBranch"){
			$response = updateBranch($form_data);
			echo $response;
		}
	}  
	function getBranchList($form_data){  
	     include('database_connection.php'); 
	     $output = array();  
		$sql = "SELECT id, name, address,type,active, 									created_date,modified_date,active 	
				FROM branches_list 
				WHERE created_by='".$_SESSION['uid']."'";
		
		//echo $_GET['id'];
		if(isset($_GET['id'])) {
			$sql.= " AND id='".$_GET['id']."'";
		}  
		if(!empty($form_data->name))
		{
		 	$sql.= " AND name like'%".$form_data->name."%'"; 
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

	function updateBranchStatus($data){
		include('database_connection.php'); 
	     $output = array(); 
		if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $status = $data->active;
		      $query = "UPDATE branches_list set active='$status', modified_date=CURRENT_TIMESTAMP,modified_by='".$_SESSION['uid']."' WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		          $message =  "Branch updated successfully..";
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

	function deleteBranch($data ){
		 include('database_connection.php'); 
		 $output = array(); 
		 $message = '';
		 $error = '';
		 if(count($data) > 0)  
		 {    
		      //print_r($data);
		      $id = $data->id;  
		      $query = "DELETE FROM branches_list WHERE id='$id'"; 
		      //echo $query; 
		      if ($conn->query($query) === TRUE) {
		          $message =  "Branch deleted successfully..";
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

	function updateBranch($form_data){
		include('database_connection.php'); 
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
		if(empty($form_data->address))
		{
		 $error.= 'address is Required'."<br>";
		}
		else
		{
		 $address = $form_data->address;
		}
		

		if(empty($error))
		{
		    $uid = $_SESSION['uid'];
			if(isset($form_data->id)){
				$id = $form_data->id;
				$query = "UPDATE branches_list 
						  SET name='$name',address='$address', modified_by='$uid',modified_date=CURRENT_TIMESTAMP
						  WHERE id='$id'";
			} else {
			 $query = "INSERT INTO branches_list (name, address, type,active,created_by) VALUES ('$name', '$address', 'Branch',1, '$uid') ";
			}
			//echo $query;
			 if ($conn->query($query) === TRUE) {
			    $message = isset($form_data->id)?"record updated successfully":"New record created successfully";
				
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