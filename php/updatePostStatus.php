<?php  
 //delete.php  
session_start();
 include('database_connection.php'); 
 $message = '';
 $error = '';
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {    
      //print_r($data);
      $id = $data->id;  
      $status = $data->active;
      $uid = $_SESSION['uid'];
      $query = "UPDATE load_postings set active='$status', modified_by='$uid',modified_date=CURRENT_TIMESTAMP WHERE id='$id'"; 
      //echo $query; 
      if ($conn->query($query) === TRUE) {
          $message =  "Post updated successfully..";
      } else {
          $error+= "Error: " . $conn->error."<br>";
      }

 } 
 $output = array(
 'error'  => $error,
 'message' => $message
);

echo json_encode($output); 
 ?>  