<?php

$user = array();

$user["id"] = 9;
$user["first_name"] = "Michael";
$user["last_name"] = "Choi";
$user["age"] = 33;
$user["belt_level"] = "double black belt";

//transform php array into a javascript object / json format
echo json_encode($user);
