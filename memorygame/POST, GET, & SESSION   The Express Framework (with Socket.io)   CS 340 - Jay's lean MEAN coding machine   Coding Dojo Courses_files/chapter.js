$(document).ready(function(){
	$('#activate_menu_checkbox').on('change', function(){
		var activate_menu_checkbox = document.getElementById("activate_menu_checkbox");

		$.post('/students/set_sidebar_status',
			{
				is_sidebar_opened:activate_menu_checkbox.checked
			},
			function(data){
				if(! data.status){
					alert('Sorry! An error occurred, please reload the page.');
				}
				else
					$(".nano").nanoScroller();
			},'json'
		);

	});

	var scroll_top_value = 0;
	$(".nano").on("update", function(event, values){ 
		scroll_top_value = values.position;
	});

	$('.tab_list li.current, .tab_list li.completed_tab').on('mouseover', function(e){

		var added_width = 0;
		added_width += ( parseInt( $(this).find('.progress_container').length ) == 0 ) ? 50 : 60 + $(this).find('.tab_progress').outerWidth();
		$(this).find('.tab_title').css({ 'width': added_width + $(this).find('.tab_title h4').outerWidth() });
		// if($('#sidebar').scrollTop() > 0)
		// 	$(this).find('.tab_title').css({'margin-top': $('#sidebar').scrollTop() * -1});
		
		if( scroll_top_value > 0)
			$(this).find('.tab_title').css({'margin-top': scroll_top_value * -1});

	});

	$('.tab_list li.current, .tab_list li.completed_tab').on('mouseout', function(e){
		$(this).css({'width': '62px'});
		$(this).find('.tab_title').css({'margin-top': 0/*, 'width':0*/});
	});

	$('.progress').tooltip({placement: 'top',trigger: 'manual'}).tooltip('show');

	$('.progress_bar').each(function(){
		var width = parseInt($(this).attr('data-original-title'));

		if(width == 100)
			width -= 22;
		else if(width == 0)
			width = 7;
		else
			width -= 14;
		
		if(width < 40)
			$(this).siblings('.chapter_title').css('text-align', 'right');
		
		$(this).siblings('.tooltip').css('margin-left', width +'%');
	});

	// complete module
	$('#content_footer').on('click', '.next_to_complete_module', function(){
		var form = $(this).parent().find('.complete_module_form');
		var button_url = $(this).attr('href');

		if(form.length > 0)
		{
			$.post(form.attr('action'), form.serialize(), 
				function(data){
					if(data.status === true){
						window.location.href = button_url;
					}
					else{
						alert(data.error_message);
					}
				}, 'json'
			);
		}

		return false;
	});

	/* IF PROCESSING, DISABLE THE UPDATE OF TO DO ITEM*/
	var updating_to_do_item = 0;
	
	$('#module_container .module_content_block').on('click','.todo_item_parent li .todo_list_item, .todo_item_parent li .item_checkbox',function(){
		if(updating_to_do_item == 0)
		{
			updating_to_do_item = 1;
			var form = $(this).parent();

			$.post(form.attr('action'), form.serialize(),
				function(data)
				{
					if(data.status)
					{
						form.find('input[name=id]').val(data.id)
						form.find('input[name=is_completed]').val(data.is_completed)
						form.find('input[name=activity_log_id]').val(data.activity_log_id)
						
						var checkbox_item = form.find('input[type=checkbox]');
						
						if(checkbox_item.attr('checked') === 'checked'){
							checkbox_item.attr('checked', false);
							form.children('.item_checkbox').toggleClass("checked");
						}
						else{
							checkbox_item.attr('checked', true);
							form.children('.item_checkbox').toggleClass("checked");
						}					
					}
					else
					{
						alert(data.error_message);
					}
						
					updating_to_do_item = 0;
				}
			,"json");
		}		
	});

	$('#module_container').on('click', '.todo_content .upload_file_button', function(){
		$(this).parent().trigger('submit');
	});

	// upload a user file
	$('#module_container').on('submit', '.todo_content .todo_file_upload_form', function(){
		var form = $(this);
		var fn_data = new FormData();
		var input_file_id = $(this).find(':file').attr('id');
		var file = document.getElementById(input_file_id).files[0];

		if(file)
		{		
			fn_data.append('file', file);
			$.each(form.serializeArray(), function(index, field) {
			     fn_data.append(field.name, field.value);
			});
			
			// Disable and Change text of Upload button while Uploading
			form.find('.upload_file_button').attr('disabled', true);
			form.find('.upload_file_button_text').text('Uploading File...');		
			
			$.ajax({
				url: form.attr('action'),
				data: fn_data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				dataType: 'json',
				success: function(data){
					if(data.status)
					{
						form.parent().siblings('.upload_item_table')
							.find('tbody')
							.append(
								'<tr>\n'+															
								'	<td>\n'+
								'		<a href="'+ data.file_url +'">'+ data.file_name +'</a>\n'+
								'	</td>\n'+
								'	<td>\n'+
								'		<div class="date_uploaded">'+ data.date_uploaded +'</div>\n'+
								'	</td>\n'+
								'	<td>\n'+
								'		<form action="/students/remove_to_do_file" method="post" class="form_remove_item">\n'+
								'			<input type="hidden" name="id" value="'+ data.id +'" />\n'+
								'			<input type="hidden" name="file_name" value="'+ data.file_name +'" />\n'+
								'			<div class="glyphicon glyphicon-trash remove_file_button"></div>\n'+																
								'		</form>\n'+
								'	</td>\n'+
								'</tr>\n'
							);

							form.find('.upload_file_button_text').text('Upload Successful');
					}
					else
					{
						form.find('.upload_file_button_text').text('Upload Failed');

						if(data.is_not_logged_in)
							window.location = data.redirect_url;
						else
							alert(data.error_message);
					}

					// Reset the form and bring back the original Upload button text
					form[0].reset();					

					setTimeout( function() {
						form.find('.upload_file_button').removeAttr('disabled');
						form.find('.upload_file_button_text').text('Upload File');
					}, 1500);
				}
			});
		}
		
		return false;
	});

	$('#module_container').on('click', '.todo_content .remove_file_button', function(){
		$(this).parent().trigger('submit');
	});

	// remove a user file
	$('#module_container').on("submit",'.todo_content .form_remove_item', function()
	{
		var form = $(this);
		var file_name_field = form.find('input[name="file_name"]');

		if(confirm('Are you sure you want to delete the file named "'+ file_name_field.val() +'"?'))
		{
			file_name_field.remove();

			$.post(form.attr('action'), form.serialize(),
				function(data)
				{
					if(data.status)
					{
						form.parent().parent().fadeOut(function(){
							$(this).remove();
						}); 
					}
					else
						alert(data.message);
				}
				, "json"
			);	
		}
		return false;
	});

	$('#quiz_contents_block').on('submit', '#get_quiz_form', function(){
		var form = $(this);
		form.find('input[type=submit]').attr('value', 'Getting Questions...').attr('disabled', true);
		
		$.post(form.attr('action'), form.serialize(),
			function(data)
			{	
				if(data.status)
				{
					$('#quiz_questions_block').html(data.quiz_items);					
					$('#quiz_results_block').slideUp('slow');
					$('#quiz_instructions_block').slideUp('slow', function(){
						form.find('input[type=submit]').removeAttr('disabled', true).attr('value', 'Start Quiz');
					});
				}
				else
				{
					if(data.is_not_logged_in)
						window.location = data.redirect_url;
					else
						alert('Sorry! An error occurred, please reload the page.');
				}
			},'json'
		);
		
		return false;
	});

	// Submitting the quiz
	$('#quiz_contents_block').on('submit', '#submit_quiz_form', function(){
		if(confirm('Are you sure you want to submit the quiz now?'))
		{
			var form = $(this);	
			$('#submit_quiz_button').attr('value','Checking Quiz...').attr('disabled', true);
						
			$.post(form.attr('action'), form.serialize(),
				function(data)
				{
					if(data.status)
					{
						$('#submit_quiz_button').attr('value','Getting Results...');

						form.slideUp('slow', function(){
							$('#quiz_results_block').hide('slow', function(){
								$(this).html(data.quiz_result_html).slideDown('slow');

								// update the tab/module progress indicator
								// found on the left navigation bar with the latest quiz result
								$('#chapter_list .tab_list .tab_progress').text(data.latest_quiz_result_percentage +'%');
							});
							
							// remove the form
							$(this).remove();
						});

						if(! data.allow_quiz_retake)
						{
							$('#quiz_instructions_block').remove();
							$('#quiz_questions_block').remove();
						}
						else{
							$('#quiz_instructions_block').html(data.quiz_instruction_html).slideDown('slow');							
						}	
					}
					else
					{
						alert(data.message);
						$('#submit_quiz_button').attr('value','Checking Failed');
					}
					
					setTimeout( function() {
						$('#submit_quiz_button').attr('value','Submit Quiz').removeAttr('disabled');
					}, 1500);
				}, 'json'
			);
		}
		
		return false;
	});

	$('#quiz_contents_block').on('click', '.display_quiz_result', function(){
		var dialog_title = $(this).attr('data-quiz-title') +' Quiz Result';
		
		$.post('/students/get_quiz_result_details',
			{	
				id:$(this).attr('data-id')
			},
			function(data){
				if(data.status)
				{
					$.fancybox.open([{
						content: data.quiz_result_details,
						afterShow: function(){
							$('.correct_answer').addClass('glyphicon glyphicon-ok')
							$('.wrong_answer').addClass('glyphicon glyphicon-remove')
						},
						maxWidth: 800
					}]);
				}
				else{
					alert('Sorry! An error occurred, please reload the page.');
				}					

			},'json'
		);		
	});

	setTimeout(function(){
		var input_width = ($(window).width() > 1024) ? 914 : 739;
		resize_vimeo_iframes(938);

		if( $('iframe[src*=vimeo], iframe[src*=youtube]').length > 0 )
		{
			// $('.module_description > *:first').prepend('<span class="glyphicon glyphicon-facetime-video">');
		}
	}, 150);

	/*$(window).resize(function(){
		var input_width = ($(this).width() > 1024) ? 914 : 739;
		resize_vimeo_iframes(input_width);
	});*/

	$(".nano").nanoScroller();
});

function resize_vimeo_iframes(maxWidth){
		$('iframe[src*=vimeo], iframe[src*=youtube]').each(function(){
			var frame_width = $(this).attr('width');
			var frame_height = $(this).attr('height');

			var final_height = (frame_height > 0) ? (frame_height/frame_width) * maxWidth : 514;

			$(this).css({'width': maxWidth, 'height': final_height}).addClass('vimeo_responsive');

			// $(this).css({'width': '739px', 'height': '415px'}).addClass('vimeo_responsive');
		});
	}