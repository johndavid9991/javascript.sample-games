function memory_game(){

	this.tiles_open = []

	this.tiles = [
		{ tile_id: 0, img_url: "http://www.ninja-stars.com/90-16.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 0, img_url: "http://www.ninja-stars.com/90-16.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 1, img_url: "http://cdn4.thesearchninjas.com/wp-content/uploads/2014/08/star.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 1, img_url: "http://cdn4.thesearchninjas.com/wp-content/uploads/2014/08/star.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 2, img_url: "http://allninjagear.com/content/images/thumbs/0000246_metallica-ninja-throwing-star.jpeg", is_open: false, is_matched: false }, 
		{ tile_id: 2, img_url: "http://allninjagear.com/content/images/thumbs/0000246_metallica-ninja-throwing-star.jpeg", is_open: false, is_matched: false }, 
		{ tile_id: 3, img_url: "https://www.karatemart.com/images/products/large/black-ronin-throwing-star.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 3, img_url: "https://www.karatemart.com/images/products/large/black-ronin-throwing-star.jpg", is_open: false, is_matched: false }, 
		{ tile_id: 4, img_url: "http://www.clker.com/cliparts/W/O/h/E/A/w/ninja-star-md.png", is_open: false, is_matched: false }, 
		{ tile_id: 4, img_url: "http://www.clker.com/cliparts/W/O/h/E/A/w/ninja-star-md.png", is_open: false, is_matched: false }, 
		{ tile_id: 5, img_url: "http://images4.wikia.nocookie.net/__cb20130308024926/twitterponies/images/6/60/Ninja_Star_Cutie_Mark.png", is_open: false, is_matched: false },
		{ tile_id: 5, img_url: "http://images4.wikia.nocookie.net/__cb20130308024926/twitterponies/images/6/60/Ninja_Star_Cutie_Mark.png", is_open: false, is_matched: false },
	]

	this.initialize = function(){
		this.render_tiles()
	}

	this.render_tiles = function(){
		game_tiles_view = ""

		this.shuffle(this.tiles)

		console.log(this.tiles)
		for(ctr = 0; ctr < this.tiles.length; ctr++){
			game_tiles_view = game_tiles_view + "<li data-tile_address="+ctr+"><img src="+this.tiles[ctr].img_url+" alt='' /> </li>"
		}

		$("#tiles").html(game_tiles_view)
		//console.log("tiles has been rendered")
	}

	this.open_tile = function(tile_address){
		this.tiles[tile_address].is_open = true
		this.tiles_open.push(tile_address)

		return this.has_match(this.tiles[tile_address].tile_id, tile_address)
		//console.log(tile_address+"-address was open")
	}

	this.has_match = function(tile_id, tile_address){
		console.log("checking for match", tile_id)

		match_found_status = false
		tile_to_hide = null

		for(ctr = 0; ctr < this.tiles.length; ctr++){

			if(this.tiles[ctr].tile_id == tile_id 
				&& this.tiles[ctr].is_open == true
				&& ctr != tile_address){

				this.tiles[ctr].is_matched = true
				this.tiles[tile_address].is_matched = true
				this.tiles_open = []

				if(match_found_status == false){
					console.log("match found")
					match_found_status = true
					break
				}
			}
		}

		if(this.tiles_open.length == 2){
			this.tiles[this.tiles_open[0]].is_open = false
			tile_to_hide = this.tiles_open[0]
			this.tiles_open = this.tiles_open.splice(1, 1)
			console.log("reset open tiles array")
		}

		return {
			match:	match_found_status,
			tile_to_hide: tile_to_hide
		}
	}

	//note: this shuffle function is not my code, i just reused http://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
	this.shuffle = function(sourceArray) {
	    for (var n = 0; n < sourceArray.length - 1; n++) 
	    {
	        var k = n + Math.floor(Math.random() * (sourceArray.length - n));
	        var temp = sourceArray[k];
	        sourceArray[k] = sourceArray[n];
	        sourceArray[n] = temp;
	    }
	}

	this.initialize()
}