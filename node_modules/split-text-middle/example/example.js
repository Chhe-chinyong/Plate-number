var split = require('../index.js');


var text1 = 'This is a long sentence, something that has a comma in it';
var text2 = 'This is a longer sentence, something that has multiple commas, dots. And other, stuff like space monkeys, free beer.. And, who knows.';



console.log("text1", split(text1));
console.log("text2", split(text2));