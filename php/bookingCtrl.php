<?php
error_reporting(E_ERROR | E_PARSE);
session_start();
$form_data = json_decode(file_get_contents('php://input'));
if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "myBookings"){
			$response = myBookings($form_data);
			echo $response;
		}
} 

function myBookings($form_data) {
		include('database_connection.php');
		$output = array();  
		$message = '';
		$error = '';
		$uid = $_SESSION['uid']; 
		$sql = "SELECT load_truck_requests.booking_id,load_truck_requests.request_status,load_truck_requests.request_date,load_postings.id, 
					   load_postings.load_type, load_postings.truck_type, load_postings.from_city, load_postings.from_location, load_postings.to_city,
					   load_postings.to_location, load_postings.distance_km, load_postings.load_cost, load_postings.load_cost_type, load_postings.advance_percent, 	
					   load_postings.tonns_available,load_postings.available_date_from, load_postings.available_date_to, load_postings.available_daily, 
					   load_postings.uid, load_postings.tid,load_postings.active, load_postings.created_date,vehicle_type.vehicle_type,
					   load_type.load_type as typeOfLoad, branches_list.address, drivers_list.driver_name,  trucks_list.vehicle_registration_no 
				FROM load_truck_requests  
				INNER JOIN load_postings ON load_truck_requests.request_load_id=load_postings.id 
				INNER JOIN vehicle_type ON load_postings.truck_type=vehicle_type.id
				INNER JOIN load_type ON load_postings.load_type=load_type.id
				INNER JOIN branches_list ON load_postings.tid=branches_list.id 
				INNER JOIN drivers_list ON load_truck_requests.assigned_driver_id=drivers_list.id 
				INNER JOIN trucks_list ON load_truck_requests.request_truck_id=trucks_list.id 
				WHERE load_truck_requests.active=1 AND load_truck_requests.request_user_id = '".$_SESSION['uid']."'";
	
		//echo $_GET['id'];
		if(isset($_GET['id'])) {
			$sql.= " AND load_truck_requests.id='".$_GET['id']."'";
		}
		if(isset($_GET['type'])) {
				$sql.= " AND load_truck_requests.request_type='".$_GET['type']."'";
		} 
		
		//echo $sql;
		$query=$conn->query($sql);
		while($row=$query->fetch_array()){
			$new_datetime = DateTime::createFromFormat ( "Y-m-d H:i:s", $row["request_date"] );
			$row["request_date"] =  $new_datetime->format('d F Y, h:i:s A');
			$row["active"] = ($row["active"] == 1) ? true: false;
			$output[] = $row;
		}

		echo json_encode($output);

}	 
?>