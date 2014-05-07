var tableify = require('./');

console.log(tableify(
{
	test : {
		data : [
			{ a : 1, b : 2 }
			, { a : 4, b : 5 }
		]
	}
}
));
