<?php
error_reporting(E_ERROR | E_PARSE);
session_start();
$form_data = json_decode(file_get_contents('php://input'));
if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "search"){
			$response = search($form_data);
			echo $response;
		} else if($action == "getTrucksList"){
			$response = getTrucksList($form_data);
			echo $response;
		} else if($action == "getDriversList"){
			$response = getDriversList($form_data);
			echo $response;
		} else if($action == "createLoadRequest"){
			$response = createLoadRequest($form_data);
			echo $response;
		}
	}  
function getDriversList($form_data){  
     include('database_connection.php'); 
     $output = array();  
	$sql = "SELECT id, uid, driver_name, driver_age, driver_license_number, driver_mobile, 		driver_address, driver_photo, driver_license,driver_aadhar_number,aadhar_copy, active, created_by, created_date 
			FROM drivers_list
			WHERE active=1 AND created_by='".$_SESSION['uid']."'";
	
	//echo $_GET['id'];
	if(isset($_GET['id'])) {
		$sql.= " AND id='".$_GET['id']."'";
	}  
	
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		/*$new_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["created_date"] );
		$row["created_date"] =  $new_datetime->format('d F Y, h:i:s A');
		if(isset($row["modified_date"]) && $row["modified_date"]!=null){
			$modified_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["modified_date"] );
		$row["modified_date"] =  $modified_datetime->format('d F Y, h:i A');
		}
		$row["active"] = ($row["active"] == 1) ? true: false;*/
		$output[] = $row;
	}

	return json_encode($output);
       
}  
function getTrucksList($form_data){  
     include('database_connection.php'); 
     $output = array();  
	$sql = "SELECT trucks_list.id, trucks_list.uid, trucks_list.vehicle_registration_no, 				   	   trucks_list.truck_capacity,trucks_list.truck_rc,
				   trucks_list.truck_insurence, trucks_list.truck_pollution, 
				   trucks_list.truck_image, trucks_list.driver_aadhar_number,
				   trucks_list.aadhar_copy,trucks_list.truck_fitness_certificate, 
				   trucks_list.active, trucks_list.created_by, 
				   trucks_list.created_date, trucks_list.modified_by, 
				   trucks_list.modified_date,vehicle_type.vehicle_type 
				FROM trucks_list
				INNER JOIN vehicle_type ON trucks_list.vehicle_type=vehicle_type.id
				WHERE trucks_list.active=1 AND trucks_list.created_by='".$_SESSION['uid']."'";
	
	//echo $_GET['id'];
	if(isset($_GET['id'])) {
		$sql.= " AND id='".$_GET['id']."'";
	}  
	
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		/*$new_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["created_date"] );
		$row["created_date"] =  $new_datetime->format('d F Y, h:i:s A');
		if(isset($row["modified_date"]) && $row["modified_date"]!=null){
			$modified_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["modified_date"] );
		$row["modified_date"] =  $modified_datetime->format('d F Y, h:i A');
		}
		$row["active"] = ($row["active"] == 1) ? true: false;
		$row["truck_rc"] = ($row["truck_rc"]!= '') ? $row["truck_rc"]: 'noimage.png';
		$row["truck_insurence"] = ($row["truck_insurence"]!= '') ? $row["truck_insurence"]: 'noimage.png';
		$row["truck_pollution"] = ($row["truck_pollution"]!= '') ? $row["truck_pollution"]: 'noimage.png';
		$row["truck_image"] = ($row["truck_image"]!= '') ? $row["truck_image"]: 'noimage.png';
		$row["truck_fitness_certificate"] = ($row["truck_fitness_certificate"]!= '') ? $row["truck_fitness_certificate"]: 'noimage.png';*/
		$output[] = $row;
	}

	return json_encode($output);
       
} 
function search($form_data) {
 	include('database_connection.php');


	$output = array();
	//$sql = "SELECT * FROM members WHERE memid = '".$_SESSION['uid']."'";
	$sql = "SELECT load_postings.id, load_postings.load_type, load_postings.truck_type, load_postings.from_city, load_postings.from_location, load_postings.to_city, 	load_postings.to_location, load_postings.distance_km, load_postings.load_cost, load_postings.load_cost_type, load_postings.advance_percent, load_postings.tonns_available,load_postings.available_date_from, load_postings.available_date_to, load_postings.available_daily, load_postings.uid, load_postings.tid,load_postings.active, load_postings.created_date,vehicle_type.vehicle_type,load_type.load_type as typeOfLoad, branches_list.address 
			FROM load_postings  
			INNER JOIN vehicle_type ON load_postings.truck_type=vehicle_type.id
			INNER JOIN load_type ON load_postings.load_type=load_type.id
			INNER JOIN branches_list ON load_postings.tid=branches_list.id
			WHERE load_postings.is_deleted = 0 ";
	
	//echo $_GET['id'];
	if(isset($_GET['id'])) {
		$sql.= " AND load_postings.id='".$_GET['id']."'";
	}
	
	//$form_data = json_decode(file_get_contents('php://input'));
	$format = 'd/m/Y';
	
	if(!empty($form_data->load_type))
	{
	 	$sql.= " AND load_postings.load_type='".$form_data->load_type."'"; 
	}
	if(!empty($form_data->fromDate) || !empty($form_data->toDate))
	{
	 	$from_date = '';
	 	$toDate = '';
	 	if(!empty($form_data->fromDate)){
	 		$date = $form_data->fromDate; 
			$date = DateTime::createFromFormat($format , $date);
			$from_date = $date->format('Y-m-d');
	 	}
	 	if(!empty($form_data->toDate)){
	 		$date = $form_data->toDate; 
			$date = DateTime::createFromFormat($format , $date);
			$toDate = $date->format('Y-m-d');
	 	}
	 	if($from_date!='' && $toDate!=''){
	 		$sql.= " AND load_postings.available_date_to BETWEEN '".$from_date."' and '".$toDate."'";
	 	} else if($from_date!='' && $toDate=='') {
	 		$sql.= " AND load_postings.available_date_to BETWEEN '".$from_date."' and DATE(NOW())";
	 	}
	 	else if($from_date=='' && $toDate!='') {
	 		$sql.= " AND load_postings.available_date_to BETWEEN DATE(NOW()) and '".$toDate."'";
	 	}
	 	
	}
	//echo $sql;
	$query=$conn->query($sql);
	while($row=$query->fetch_array()){
		if(($row['available_date_to'])!='0000-00-00'){
			$row["available_date_to"] =  date_format(date_create($row["available_date_to"]),"d/m/Y");
		} else {
			$row["available_date_to"] = '';
		}
		if(($row['available_date_from'])!='0000-00-00'){
			$row["available_date_from"] =  date_format(date_create($row["available_date_from"]),"d/m/Y");
		} else {
			$row["available_date_from"] = '';
		}
		$row["available_daily"] = ($row["available_daily"] == 1) ? true: false;
		$new_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["created_date"] );
		$row["created_date"] =  $new_datetime->format('d F Y, h:i:s A');
		$row["active"] = ($row["active"] == 1) ? true: false;
		$output[] = $row;
	}
	return json_encode($output);
 }


 function createLoadRequest($form_data){
		include('database_connection.php');
		include('Instamojo/config.php'); 
		//$form_data = json_decode($_POST['model']);
		//echo $form_data->driver_name;
		//print_r($form_data);
		$output = array();  
		$message = '';
		$error = '';
		$payment_id = '' ;
		$uid = $_SESSION['uid'];
		$query = "INSERT INTO load_truck_requests  (request_type, request_load_id, request_truck_id, request_user_id, assigned_driver_id,created_by,request_status,booking_id) VALUES";
		$booking_ids = '';
		foreach ($form_data as $obj) {
			$booking_id = 'RVNLB'.generateID();
			$booking_ids.=$booking_id.",";
			$query.= "('load','" .$obj->loadId."','" .$obj->truckId."','" .$uid."','" .$obj->driverId."','" .$uid."','payment pending','".$booking_id."'),";
			//$obj = json_decode($obj);
			
		}
		 $query = rtrim($query, ','); // omit the last comma
		 $booking_ids = rtrim($booking_ids, ','); // omit the last comma
		//echo $query;
		 if ($conn->query($query) === TRUE) {
		 	$amount = sizeof($form_data)*10;
		 	$number = '8147595223';
		 	$name = 'Siva';
		 	$email = 'sivame85@gmail.com';
		 	$ch = curl_init();

			curl_setopt($ch, CURLOPT_URL, 'https://'.$mode.'.instamojo.com/api/1.1/payment-requests/');
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
			curl_setopt($ch, CURLOPT_HTTPHEADER,
			            array("X-Api-Key:$api_key",
			                  "X-Auth-Token:$api_secret"));
			$payload = Array(
			    'purpose' => 'Load Booking',
			    'amount' => $amount,
			    'phone' => $number,
			    'buyer_name' => $name,
			    'redirect_url' => $redirect_url,
			    'send_email' => true,
			    'webhook' => $webhook_url,
			    'send_sms' => true,
			    'email' => $email,
			    'allow_repeated_payments' => false
			);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
			$response = curl_exec($ch);
			curl_close($ch); 


			//print_r($response);


			$data = json_decode($response, true);

			if($data['success'] == 1) {
				$payment_id = $data['payment_request']['id'];
				$_SESSION["booking_ids"] = $booking_ids;
				//header('Location:'.$data['payment_request']['longurl'].'');
			}
							
		} else {
		    $error.= "Error: " . $conn->error."<br>";
		}
		$output = array(
		 'error'  => $error,
		 'message' => $message,
		 'payment_id' => $payment_id,
		);

		return json_encode($output);
}

function generateID()
{
    $capital_letters = range("A", "Z");
    $lowcase_letters = range("a", "z");
    $numbers         = range(0, 9);

    $all = array_merge($numbers);
    $count = count($all);    
    $id    = "";

    for($i = 0; $i < 10; $i++)
    {
        $key = rand(0, $count);
        $id .= $all[$key];
    }

    if(!uniqueId($id))
    {
        return generateID();
    }
    return $id;
}

function uniqueId($id) 
{
	include('database_connection.php'); 
	$sql = "SELECT booking_id FROM load_truck_requests  WHERE booking_id ='$id'";
	$query = $conn->query($sql);

	if($query->num_rows>0){
		return false;
	} else {
		return true;
	}
}
	 
?>