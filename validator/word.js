var Filter = require("bad-words"),
	filter = new Filter();

	const validation=function WordValidation(name){
		const check=filter.isProfane(name); // true is bad , false is appropriate
		return check;
	//	console.log(filter.clean("dont be "+name));
	}

	module.exports.validation=validation;