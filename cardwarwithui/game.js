function CardWar()
{
	var player_a = player_b = null;
	var winner_score = 10;
	this.winner_message = null;
	this.player_a_score = this.player_b_score = 0;
	this.player_a_img = this.player_b_img = "";

	//set card details
	this.initialize = function(){
		cards = ["2","3","4","5","6","7","8","9","10","jack","queen","king", "ace"];
		symbols = ["clubs","diamonds","hearts","spades"];
	}

	//execute the game
	this.gameloop = function(){
		//draw cards for both palyers
		player_a = create_card();
		player_b = create_card();

		//get img source of cards
		this.player_a_img = player_a.card_img;
		this.player_b_img = player_b.card_img;

		//increment score 
		if(player_a_win() != null)
			(player_a_win()) ? this.player_a_score += 1 : this.player_b_score += 1;

		//check if there is a winner
		if(this.player_a_score >= winner_score)
			this.winner_message = "Player A Won!";
		if(this.player_b_score >= winner_score)
			this.winner_message = "Player B Won!";
	}

	//get card details
	create_card = function(){
		card_index = (Math.floor(Math.random()*13-1)+1);
		symbol_index = (Math.floor(Math.random()*4-1)+1);

		return {
			"number": cards[card_index],
			"card_rank": card_index,
			"symbol": symbols[symbol_index],
			"symbol_rank": symbol_index,
			"card_img": "cards/"+cards[card_index]+"_of_"+symbols[symbol_index]+".png"
		}
	}

	//check if player a won
	player_a_win = function(){
		if(player_a.card_rank > player_b.card_rank)
			return true;
		else if(player_a.card_rank == player_b.card_rank)
		{
			if(player_a.symbol_rank > player_b.symbol_rank)
				return true;
			else if(player_a.symbol_rank == player_b.symbol_rank)
				return null;
			else 
				return false;
		}
		else
			return false;
	}

	this.initialize();
}