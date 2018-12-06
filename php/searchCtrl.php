<?php
error_reporting(E_ALL & ~E_NOTICE);
session_start();
$form_data = json_decode(file_get_contents('php://input'));
if(isset($_GET['action'])) {
		$action= $_GET['action'];
		if($action == "search"){
			$response = search($form_data);
			echo $response;
		}
		else if($action == "getTrucksList"){
			$response = getTrucksList($form_data);
			echo $response;
		}
		else if($action == "getDriversList"){
			$response = getDriversList($form_data);
			echo $response;
		}
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
	 
?>