const Filter = require("bad-words");
const Joi = require('@hapi/joi');
filter = new Filter({ placeHolder: '#'});
	// Add bad words
	filter.addWords('KDET', 'KDOR', 'KDMV');

	const wordValidation=function WordValidation(name){
		const check=filter.isProfane(name); // true is bad , false is appropriate
		if(check){
			return true;
		}
		return false;
	
	}

	const registerValidation= (data)=>{
		const schema=Joi.object({
		phone:Joi.string().regex(/^\d{3}-\d{3}-\d{3,4}$/).required(),
		password:Joi.string().min(8).max(32).regex(/(?=.*[A-Z])(?=.*[a-z])/).required(),
		email:Joi.string().trim().email().required()
	})
		return schema.validate(data);
	}
	
const loginValidation=(data)=>{
    const schema=Joi.object({
    email:Joi.string().required(),
	password:Joi.string().required()})
    return schema.validate(data);
}

	module.exports.wordValidation=wordValidation;
	module.exports.registerValidation=registerValidation;
	module.exports.loginValidation=loginValidation;
	
	
	
	
	
	