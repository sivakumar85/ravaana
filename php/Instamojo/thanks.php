<?php
include 'config.php';
session_start();
?>
<!DOCTYPE html>
<html>
<title>Payment Details!</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="../../js/jquery.js"></script>
    <script src="../../js/bootstrap.min.js"></script>
<body>
 <div id="divProcessing"><span class="std_loadingBackground"></span><div style="top: 30%; left: 40%;" class="std_modalContainer"><div class="std_tcenter"><img id="myAnimatedImage" alt="Processing.... Please wait!" src="../../images/ajax-loader.gif"><span class="std_processing">Processing... Please wait!</span></div></div></div>
 <style>
.modal-center {
    display:table;
    height: 100%;
    width: 100%;
}
.modal-align-center {: table-cell;vertical-align: middle;}
.modal-content {
    height:inherit;
    margin: 0 auto;
    background-color: white !important;
    width: 409px;
}
.text-bold {
    font-weight: 700;
}
.float--right {
    float: right!important;
}
.right {
    text-align: right;
}
.row.collapse>.columns {
    padding-left: 0;
    padding-right: 0;
}
@media only screen and (max-width: 700px) {
    .modal-content {
    height:inherit;
    margin: 0 auto;
    background-color: white !important;
    width: 356px;
}
   }
  }
</style>
<div class="container">


    
    
 <?php

include 'src/instamojo.php';
include('../database_connection.php'); 

$api = new Instamojo\Instamojo($api_key, $api_secret,'https://'.$mode.'.instamojo.com/api/1.1/');

$payid = $_GET["payment_request_id"];
$message = '';
$status_image = '';
$payment_header = '';
$payment_msg = '';
$request_status = '';
$button_url = '';
$button_txt = '';
try {
    $response = $api->paymentRequestStatus($payid);


    $res = "<table class='table-compact table-vertical-center table-colorless text-medium'><tbody><tr><td width='125px' class='text-bold'>Payment ID:</td><td class='float--right'> " . $response['payments'][0]['payment_id'] . "</td></tr>" ;
    $res.= "<tr><td class='text-bold'>Payment Name:</td><td class='float--right'> " . $response['payments'][0]['buyer_name'] . "</td></tr>" ;
     $res.="<tr><td class='text-bold'>Payment Email: </td><td class='float--right'>" . $response['payments'][0]['buyer_email'] . "</td></tr>" ;
     $res.= "<tr><td class='text-bold'>Purpose: </td><td class='float--right'>" . $response['purpose'] . "</td></tr>" ;
     $res.= "<tr><td class='text-bold'>Payment Status:</td><td class='float--right'> " . $response['status'] . "</td></tr>" ;
     $res.= "<tr><td class='text-bold'>Payment Amount: </td><td class='float--right'>" . $response['amount'] . " ".$response['payments'][0]['currency']."</td></tr></table>" ;
//header("Location: ../../userHome.php");
    //echo  $_SESSION["booking_ids"];
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
    $failure = $response['status'] != 'Completed'?implode($response['payments'][0]['failure']):'';
    $payout = $response['payments'][0]['payout'];
    $send_sms = $response['send_sms'];
    $send_email = $response['send_email'];
    $sms_status = $response['sms_status'];
    $email_status = $response['email_status'];
    $uid = $_SESSION['uid']; 
   if($response['status'] == 'Completed') {
      if(isset($_SESSION["booking_ids"])) {
       $request_status = "Pending from Transporter";
       $button_url = '../../userHome.php#/MyLoadBooking';
       $button_txt = 'Go to Booking';
      } else if(isset($_SESSION["bookingId"])) {
       $request_status = "Transporter Aprroved";
       $button_url = '../../userHome.php#/UserLoadRequest';
       $button_txt = 'Go to Requests';
      }
       $status_image = '../../images/payment_sucess.png';
       $payment_header = 'Payment Complete';
       $payment_msg = 'Thank you , your payment has been successful.';
       

    } else {
      $request_status = "Payment Failed";
      $status_image = '../../images/payment_error.png';
       $payment_header = 'Your Payment Failed';
       $payment_msg = 'Please try again.';
       $button_url = '../../userHome.php#/Search';
       $button_txt = 'Go Back';
    }
    
      $sel_query = "SELECT id,payment_id FROM user_payments WHERE payment_id='$payment_id'";
      $result = $conn->query($sel_query);
     
     if($result->num_rows==0){
        $query = "INSERT INTO user_payments (transaction_id, transaction_amount, payment_id, transaction_status, transaction_purpose, buyer_name, buyer_email, payment_request, instrument_type, billing_instrument, failure, payout, send_sms, send_email, sms_status, email_status, created_by) VALUES ('$transaction_id', '$transaction_amount', '$payment_id', '$transaction_status', '$transaction_purpose', '$buyer_name', '$buyer_email', '$payment_request', '$instrument_type', '$billing_instrument', '$failure', '$payout', '$send_sms', '$send_email', '$sms_status', '$email_status', $uid)";
       // echo $query;

        if ($conn->query($query) === TRUE) {
         // echo 'PaymentId-->'.$conn->insert_id;
          $payment_id = $conn->insert_id;
         if(isset($_SESSION["booking_ids"])) {
          $booking_ids_arr = explode(",",$_SESSION["booking_ids"]); 
          //  print_r($booking_ids_arr);    
      
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
          } else if(isset($_SESSION["bookingId"])){
              $bookingId = $_SESSION["bookingId"]; 
              $owner_updateQuery = "UPDATE load_truck_requests set active='1',owner_payment_id='$payment_id',request_status='$request_status', modified_date=CURRENT_TIMESTAMP,modified_by='".$_SESSION['uid']."' WHERE booking_id='$bookingId'"; 
                 // echo $updateQuery; 
                  if ($conn->query($owner_updateQuery) === TRUE) {
                      $message =  "load_truck_requests updated successfully..";
                  } else {
                      $error.= "Error: " . $conn->error."<br>";
                  }  
      
              
          }

        } else {
            $error.= "Error: " . $conn->error."<br>";
            echo $error;
        }
      } else {
        $message =  "refreshed again..";
      }


      
      

 
    ?>


    <?php
}
catch (Exception $e) {
    print('Error: ' . $e->getMessage());
}
?>
<div class="modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-center">
        <div class="modal-dialog .modal-align-center">
            <div class="modal-content">
                <div class="modal-header">
                    <!--<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span>

                    </button>-->
                     

                </div>
                <div class="modal-body">

                    <div align="center">
                    <img id="status_image" text-align="center" src="<?php echo $status_image;?>">
                    <h1 id="payment_header"><?php echo $payment_header;?></h1>
                    <p id="payment_msg"><?php echo $payment_msg;?></p>
                    <hr>
                    <h2>Your Payment Details!</h2>
                    <div id="response"><?php echo $res;?></div>
                </div>
                </div>
                <div class="modal-footer">
                    <a href="<?php echo $button_url;?>" class="btn btn-primary"><?php echo $button_txt;?></a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<?php if($message!=''){?>
<script>
  document.getElementById('divProcessing').style.display='none';
  
  $('#myModal').modal({
        show: 'true'
    }); 
</script>

<?php } ?>

 </div>
 </body>

 </html>