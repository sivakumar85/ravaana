<?php  
 //delete.php  
 include('database_connection.php'); 
 $message = '';
 $error = '';
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {    
      //print_r($data);
 	$uid = $_SESSION['uid'];
      $id = $data->id;  
      $query = "UPDATE load_postings set is_deleted=1,modified_by='$uid',modified_date=CURRENT_TIMESTAMP" WHERE id='$id'"; 
      //echo $query; 
      if ($conn->query($query) === TRUE) {
          $message =  "Post closed successfully..";
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