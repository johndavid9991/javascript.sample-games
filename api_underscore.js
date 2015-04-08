
var _ = (function(){
	return {
		map: function(){

		},
		filter: function(subject, callback){
			var result = []

			for(var ctr = 0; ctr < subject.length; ctr ++)
			{
				if(callback(subject[ctr])){
					result.push(subject[ctr])
				}
			}

			return result
		}
	}
})()

var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ 
	return num % 2 == 0 
})

var greathan_three = _.filter([1, 2, 3, 4, 5, 6], function(num){ 
	return num > 3
})