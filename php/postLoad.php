<?php

//register.php
session_start();
include('database_connection.php');

$form_data = json_decode(file_get_contents('php://input'));


//print_r($form_data);
$message = '';
$error = '';

if(empty($form_data->load_type))
{
 $error.= 'load_type is Required'."<br>";
}
else
{
 $load_type = $form_data->load_type;
}
if(empty($form_data->truck_type))
{
 $error.= 'truck_type is Required'."<br>";
}
else
{
 $truck_type = $form_data->truck_type;
}
if(empty($form_data->from_city))
{
 $error.= 'from_city is Required'."<br>";
}
else
{
 $from_city = $form_data->from_city;
}
if(empty($form_data->from_location))
{
 $error.= 'from_location is Required'."<br>";
}
else
{
 $from_location = $form_data->from_location;
}
if(empty($form_data->to_city))
{
 $error.= 'to_city is Required'."<br>";
}
else
{
 $to_city = $form_data->to_city;
}
if(empty($form_data->to_location))
{
 $error.= 'to_location is Required'."<br>";
}
else
{
 $to_location = $form_data->to_location;
}
if(empty($form_data->distance_km))
{
 $error.= 'distance_km is Required'."<br>";
}
else
{
 $distance_km = $form_data->distance_km;
}
if(empty($form_data->load_cost))
{
 $error.= 'load_cost is Required'."<br>";
}
else
{
 $load_cost = $form_data->load_cost;
}
if(empty($form_data->load_cost_type))
{
 $error.= 'load_cost_type is Required'."<br>";
}
else
{
 $load_cost_type = $form_data->load_cost_type;
}
if(empty($form_data->advance_percent))
{
 $error.= 'advance_percent is Required'."<br>";
}
else
{
 $advance_percent = $form_data->advance_percent;
}
if(empty($form_data->tonns_available))
{
 $error.= 'tonns_available is Required'."<br>";
}
else
{
 $tonns_available = $form_data->tonns_available;
}
/*if(empty($form_data->available_date))
{
 $error.= 'available_date is Required'."<br>";
}
else
{
 $available_date = $form_data->available_date;
}
if(empty($form_data->available_date))
{
 $error.= 'available_date is Required'."<br>";
}
else
{
 $available_date = $form_data->available_date;
}*/
$available_date_to = $form_data->available_date_to;
$available_date_from = $form_data->available_date_from;
$available_daily = $form_data->available_daily;
if(empty($form_data->tid))
{
 $error.= 'tid is Required'."<br>";
}
else
{
 $tid = $form_data->tid;
}

if(empty($error))
{
    //echo $business_type;  echo $name;   echo $email;  echo $mobile;  echo $password;
 $uid = $_SESSION['uid'];
 $format = 'd/m/Y';
if(isset($available_date_from) && $available_date_from!=null){
	$date_from = $available_date_from; 
	$date_from = DateTime::createFromFormat($format , $date_from);
	$available_date_from = $date_from->format('Y-m-d');
 } else {
 	$available_date_from = null;
 }
 if(isset($available_date_to) && $available_date_to!=null){
	$date_to = $available_date_to; 
	$date_to = DateTime::createFromFormat($format , $date_to);
	$available_date_to = $date_to->format('Y-m-d');
 } else{
 	$available_date_to = null;
 }
 if($available_daily) {
 	$available_date_from = null;
 	$available_date_to = null;
 }
if(isset($form_data->id)){
	$id = $form_data->id;
	$query = "UPDATE load_postings 
			  SET load_type='$load_type',truck_type='$truck_type', from_city='$from_city', from_location='$from_location', to_city='$to_city', to_location='$to_location', distance_km='$distance_km', load_cost='$load_cost',load_cost_type='$load_cost_type',advance_percent='$advance_percent',tonns_available='$tonns_available',available_date_to='$available_date_to',available_date_from='$available_date_from',available_daily='$available_daily',tid='$tid',modified_by='$uid',modified_date=CURRENT_TIMESTAMP
			  WHERE id='$id'";
} else {
	 $from_city = explode(',', $from_city)[0];
	 $from_location = explode(',', $from_location)[0];
	 $to_city = explode(',', $to_city)[0];
	 $to_location = explode(',', $to_location)[0];
	 $distance_km = round($distance_km);	 
	 $query = "INSERT INTO load_postings (load_type, truck_type, from_city, from_location, to_city, to_location, distance_km, load_cost,load_cost_type,advance_percent,tonns_available,available_date_from,available_date_to,available_daily,uid,tid,active,created_by) VALUES ('$load_type', '$truck_type', '$from_city', '$from_location', '$to_city', '$to_location', '$distance_km', '$load_cost','$load_cost_type','$advance_percent','$tonns_available','$available_date_from','$available_date_to','$available_daily','$uid','$tid',1,'$uid') ";
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

echo json_encode($output);
?>