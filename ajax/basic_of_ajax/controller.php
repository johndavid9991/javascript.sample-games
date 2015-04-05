<?php 
//sample validation 
if(! empty($_POST["email"]) && ! empty($_POST["email"]))
{
	$data["status"] = TRUE;
	$data["success"] = "Login parameters are correct.";
	$data["redirect_url"] = "user_profile_view.php";
}
else
{
	$data["status"] = FALSE;
	$data["errors"] = "Incorrect email or password.";
}
//send response back in json format
echo json_encode($data);