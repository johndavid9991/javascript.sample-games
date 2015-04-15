<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			//1 source of data,
			//2 data to be pass to source (optional), 
			//3 callback / catcher of output from source,
			//4 datatype or format of output from callback
			$("#get_user_info").click(function(){
				//$.get("http://graph.facebook.com/4", {}, function(data){
				$.get("/users.php", {}, function(data){
					$.each(data, function(index, value){
						$("#user_info").append("<li>"+index+": "+value+"</li>")
					})
				}, "json")

				return false; //prevents refreshing/redirecting of the page
			})

			$("#add_user").submit(function(){
				var form = $(this)
				
				$.post(form.attr("action"), form.serialize(), function(data){
					if(data.status){
						console.log("success")
					}
					else{
						if(data.error.email){
							form.find("input[name=email]").after("<span>"+data.error.email+"</span>")
						}
					}

				}, "json")

				return false; //prevents refreshing/redirecting of the page
			})
		})
	</script>
</head>
<body>
	<h3>Hello World!</h3>
	<button id="get_user_info">Get Info of Mark</button>
	<ul id="user_info"></ul>

	<form id="add_user" action="add_user.php" method="post">
		<div>
			<label>First Name</label>
			<input type="text" name="first_name">
		</div>
		<div>
			<label>Last Name</label>
			<input type="text" name="last_name">
		</div>
		<div>
			<label>Email Name</label>
			<input type="text" name="email">
		</div>
		<input type="submit" value="Add User">
	</form>
</body>
</html>