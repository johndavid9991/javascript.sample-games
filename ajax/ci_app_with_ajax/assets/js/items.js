$(document).ready(function(){
	//source
	//data to be pass to the source
	//callback (get data from the page)
	//format - json
	page_offset = 0;
	page_limit = 2;

	$.get("/items/get_pages", {page_limit: page_limit}, function(data){
		//console.log(data);
		$("#pages").append(data.pages);
	}, "json");

	$("#pages").on("click", "li", function(){
		var selected_offset = parseInt($(this).attr("data-offset"));
		page_offset = selected_offset * page_limit;

		load_items();
	});

	function load_items(){
		$.get("/items/fetch_items", {offset: page_offset, limit: page_limit}, function(data){
			//console.log(data);
			//$("#items tbody").append(data.items);
			$("#items tbody").html(data.items);
		}, "json");
	}

	load_items();
});