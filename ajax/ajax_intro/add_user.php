<?php

$error = array();

if($_POST["email"] == "")
{
	$data["error"]["email"] = "Invalid Email.";
	$data["status"] = false;
}

echo json_encode($data);