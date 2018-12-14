<?php header('X-Frame-Options: DENY');
	$email = 'sivakumar.sfdc@gmail.com'; //To Sent to a notify email whenever a user complete a payment.
    $api_key = 'test_1ce598eb22a3d011ae6b129facd';
    $api_secret = 'test_b8fe581be127b6b22f245afca52';
    $api_salt = 'b56ee3d97942477eb4cd5d0091d22fe0';
	$webhook_url = 'http://ravaana.000webhostapp.com/Instamojo/webhook.php';
	//$redirect_url = 'http://ravaana.000webhostapp.com/Instamojo/thanks.php';
    $redirect_url = 'http://localhost:1080/ravaana/php/Instamojo/thanks.php';
    
    $mode = "test"; //You can change it to live by jest replacing it by 'live'
    if($mode == 'live'){
        $mode = 'www';
    }else{
        $mode = 'test';
    }
    
?>