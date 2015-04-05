<!DOCTYPE html>
<html>
<head>
	<title></title>
	<!-- we need jquery to use ajax, specially function $.post() -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#login").submit(function(){
				var form = $(this);
				//store form input fields and values in one variable, read http://api.jquery.com/serialize/
				var form_data = form.serialize();

				//send data using jQuery post function $.post(), read http://api.jquery.com/jquery.post/
				//$.post handles the ajax submission and it has the following parameters:
				//		1. URL to which the request is sent, 
				//      	2. Data to be sent
				//		3. Function to execute after request and data is successfully sent
				//			- This function is considered as a callback and it has one parameter - 
				//			  that will grab the response of the server
				//		4. The datatype of server response after request
				$.post(form.attr("action"), form_data, function(login_data)
				{
					//if login is successful
					if(login_data.status)
					{
						//inform the user that login parameters are correct
						//note: the backslash (\) is used to properly concatenate html to the next line
						$("#message").html("<p class='success'> \
												<span>"+ login_data.success +"</span> \
									 			<span>You will be redirected to your profile page in 5 seconds</span> \
											</p>");

						//redirect the user to profile page after 5 seconds
						setTimeout(function(){
							window.location = login_data.redirect_url;
						}, 5000);
					}
					else
					{
						//inform the user that login parameters are incorrect
						$("#message").html("<p class='error'>"+ login_data.errors +"</p>");
					}
				}, "json");

				//use return false to stop redirection in form submission
				return false;
			});
		});
	</script>
</head>
<body>
	<div id="message"></div>
	<form id="login" action="controller.php" method="post">
		<input type="text" name="email" placeholder="email">
		<input type="password" name="password" placeholder="password">
		<input type="submit" value="Login">
	</form>
</body>
</html>
