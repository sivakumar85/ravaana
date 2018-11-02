<?php

session_start();
include('database_connection.php');


$data=json_decode(file_get_contents("php://input"));
//echo "aadhar_number".$_POST["aadhar_number"];
//print_r($data);
$message = '';
$error = '';

	$uid=$_SESSION["uid"];
	$aadhar_number=htmlspecialchars($_POST["aadhar_number"]);
	$panCard_number=htmlspecialchars($_POST["panCard_number"]);
	$company_name=htmlspecialchars($_POST["company_name"]);
	

//$path = 'upload/' . $file_name; 

	if(!empty($_FILES['image1'])&&!empty($_FILES['image2'])&&!empty($_FILES['image3'])&&!empty($_FILES['image4']))
	{
		
		if ((($_FILES["image1"]["type"] == "image/png")&&($_FILES["image2"]["type"] == "image/png")&&($_FILES["image3"]["type"] == "image/png")&&($_FILES["image4"]["type"] == "image/png") || ($_FILES["image1"]["type"] == "image/jpg")&&($_FILES["image2"]["type"] == "image/jpg")&&($_FILES["image3"]["type"] == "image/jpg")&&($_FILES["image4"]["type"] == "image/jpg") || ($_FILES["image1"]["type"] == "image/gif")&&($_FILES["image2"]["type"] == "image/gif")&&($_FILES["image3"]["type"] == "image/gif")&&($_FILES["image4"]["type"] == "image/gif") || ($_FILES["image1"]["type"] == "image/jpeg")&&($_FILES["image2"]["type"] == "image/jpeg")&&($_FILES["image3"]["type"] == "image/jpeg")&&($_FILES["image4"]["type"] == "image/jpeg"))) 
		{

			if (($_FILES["image1"]["error"] > 0)&&($_FILES["image2"]["error"] > 0)&&($_FILES["image3"]["error"] > 0)&&($_FILES["image4"]["error"] > 0))
			{
            		$error.= "File is error"."<br>"; 
        	} 
        	else 
        		{

					$ext = pathinfo($_FILES['image1']['name'],PATHINFO_EXTENSION);
					$ext2= pathinfo($_FILES['image2']['name'],PATHINFO_EXTENSION);
					$ext3= pathinfo($_FILES['image3']['name'],PATHINFO_EXTENSION);
					$ext4= pathinfo($_FILES['image4']['name'],PATHINFO_EXTENSION);
                	$image = time().date("dmY").'1'.'.'.$ext;
                	$image2 = time().date("dmY").'2'.'.'.$ext2;
                	$image3 = time().date("dmY").'3'.'.'.$ext3;
                	$image4 = time().date("dmY").'4'.'.'.$ext4;
                    // your Project file upload path
                	move_uploaded_file($_FILES["image1"]["tmp_name"], 'upload/'.$image);
                	move_uploaded_file($_FILES["image2"]["tmp_name"], 'upload/'.$image2);
                	move_uploaded_file($_FILES["image3"]["tmp_name"], 'upload/'.$image3);
                	move_uploaded_file($_FILES["image4"]["tmp_name"], 'upload/'.$image4);
					//echo "Image uploaded successfully as ".$image.$image2.$image3;

					$insertquery="INSERT INTO user_profile(uid,aadhar_number,panCard_number,company_name,profile_pic,aadhar_copy,company_certificate,company_panCard) VALUES ('$uid','$aadhar_number','$panCard_number','$company_name','$image','$image2','$image3','$image4')";
					//echo $insertquery;
						if($conn->query($insertquery) === TRUE)
						{
							
							$sql = "UPDATE user SET profile_complete= 1 WHERE uid='$uid'";
							if ($conn->query($sql) === TRUE) {
								$message = 'Profile Updated';
							} else {
								$error.= 'Not Updated'.$conn->error.'<br>';
							}
						}
						else
						{
							$error.= 'Not inserted'.$conn->error.'<br>';
						}
					
				}
		}
		else
		{
			$error+= "file must be in jpeg, jpg, png, gif<br>";
		}
	}
	else
	{
		$error.= "Image Is Empty";
	}
	$output = array(
	 'error'  => $error,
	 'message' => $message
	);

	echo json_encode($output);

?>