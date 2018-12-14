<?php
include 'config.php';
session_start();
?>
<!DOCTYPE html>
<html>
<title>Payment Details!</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="../../css/style.css">
<body>
 <div id="divProcessing"><span class="std_loadingBackground"></span><div style="top: 30%; left: 40%;" class="std_modalContainer"><div class="std_tcenter"><img id="myAnimatedImage" alt="Processing.... Please wait!" src="../../images/ajax-loader.gif"><span class="std_processing">Processing... Please wait!</span></div></div></div>
<div class="w3-container">
    <h1 class='w3-center'>Your Payment Details! <a href='../../userHome.php#/MyLoadBooking'>Go back Home</a></h1>
    <p class="w3-center">You can also save all these in Database using simple Insert Query. </p>
    <div class="w3-container w3-center">
  <button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-blue w3-hover-blue">
      Click to see the insert Script.</button>

  <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-margin w3-padding"> 
        <span onclick="document.getElementById('id01').style.display='none'" 
        class="w3-button w3-blue w3-display-topright">&times;</span>
        <h1 class='w3-center'>Simple Insert Script!</h1>
        <script src="https://gist.github.com/hackerrahul/159a02782fece68b31e6177055a30033.js"></script>
    </div>
  </div>
</div>
    
 <?php

include 'src/instamojo.php';
include('../database_connection.php'); 

$api = new Instamojo\Instamojo($api_key, $api_secret,'https://'.$mode.'.instamojo.com/api/1.1/');

$payid = $_GET["payment_request_id"];
$message = '';

try {
    $response = $api->paymentRequestStatus($payid);


    echo "<h4>Payment ID: " . $response['payments'][0]['payment_id'] . "</h4>" ;
    echo "<h4>Payment Name: " . $response['payments'][0]['buyer_name'] . "</h4>" ;
    echo "<h4>Payment Email: " . $response['payments'][0]['buyer_email'] . "</h4>" ;
    echo "<h4>Purpose: " . $response['purpose'] . "</h4>" ;
    echo "<h4>Payment Status: " . $response['status'] . "</h4>" ;
    echo "<h4>Payment Amount: " . $response['amount'] . " ".$response['payments'][0]['currency']."</h4>" ;
//header("Location: ../../userHome.php");
    echo  $_SESSION["booking_ids"];
    if(isset($_SESSION["booking_ids"])) {
      $booking_ids_arr = explode(",",$_SESSION["booking_ids"]); 
      print_r($booking_ids_arr);    
      $transaction_id = $response['id'];
      $transaction_amount = $response['amount'];
      $payment_id =  $response['payments'][0]['payment_id'];
      $transaction_status = $response['status'];
      $transaction_purpose = $response['purpose'];
      $buyer_name = $response['payments'][0]['buyer_name'];
      $buyer_email = $response['payments'][0]['buyer_email'];
      $payment_request =  $response['payments'][0]['payment_request'];
      $instrument_type =$response['payments'][0]['instrument_type'];
      $billing_instrument = $response['payments'][0]['billing_instrument'];
      $failure = $response['payments'][0]['failure'];
      $payout = $response['payments'][0]['payout'];
      $send_sms = $response['send_sms'];
      $send_email = $response['send_email'];
      $sms_status = $response['sms_status'];
      $email_status = $response['email_status'];
      $uid = $_SESSION['uid'];
      $query = "INSERT INTO user_payments (transaction_id, transaction_amount, payment_id, transaction_status, transaction_purpose, buyer_name, buyer_email, payment_request, instrument_type, billing_instrument, failure, payout, send_sms, send_email, sms_status, email_status, created_by) VALUES ('$transaction_id', '$transaction_amount', '$payment_id', '$transaction_status', '$transaction_purpose', '$buyer_name', '$buyer_email', '$payment_request', '$instrument_type', '$billing_instrument', '$failure', '$payout', '$send_sms', '$send_email', '$sms_status', '$email_status', $uid)";
     // echo $query;

      if ($conn->query($query) === TRUE) {
        echo 'PaymentId-->'.$conn->insert_id;
        $payment_id = $conn->insert_id;
       $request_status = '';
        if($response['status'] == 'Completed') {
           $request_status = "Pending from Transporter";

        } else {
          $request_status = "Payment Failed";
        }
        for($i = 0; $i < sizeof($booking_ids_arr); $i++) { 
         // echo 'bid-->'.$booking_ids_arr[$i];
            $updateQuery = "UPDATE load_truck_requests set active='1',payment_id='$payment_id',request_status='$request_status', modified_date=CURRENT_TIMESTAMP,modified_by='".$_SESSION['uid']."' WHERE booking_id='$booking_ids_arr[$i]'"; 
           // echo $updateQuery; 
            if ($conn->query($updateQuery) === TRUE) {
                $message =  "load_truck_requests updated successfully..";
            } else {
                $error.= "Error: " . $conn->error."<br>";
            }
        }

      } else {
              $error.= "Error: " . $conn->error."<br>";
              echo $error;
          }

    } 
      
      

  echo "<hr><pre>";
   //print_r($response);
echo "</pre>";
    ?>


    <?php
}
catch (Exception $e) {
    print('Error: ' . $e->getMessage());
}

if($message!=''){?>
<script>document.getElementById('divProcessing').style.display='none';</script>
<?php } ?>

 </div>
 </body>

 </html>