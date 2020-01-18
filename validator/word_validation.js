var Filter = require("bad-words"),
	filter = new Filter({ placeHolder: '#'});
	console.log(filter.clean("asshole"));
	// Add bad words
	filter.addWords('KDET', 'KDOR', 'KDMV');

	const validation=function WordValidation(name){
		const check=filter.isProfane(name); // true is bad , false is appropriate
		if(check){
			return true;
		}
		return false;
	
	}

	module.exports.validation=validation;
	
	
	
	
	
	