var Filter = require("bad-words"),
  filter = new Filter();

  const validation=function WordValidation(name){
    console.log(filter.isProfane(name)); // true is bad , false is appropriate

    console.log(filter.clean("dont be "+name));
  }

  module.exports.validation=validation;