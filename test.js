var tableify = require('./');
var assert = require('assert');
var fs = require('fs');

var html = fs.readFileSync('test.html','utf8');
var obj = {
	test : {
		data : [
			{ a : 1, b : 2, c : 'testing' }
			, { a : 4, b : 5, c : 'something' }
			, { a : 5, b : 8, c : 'something else' }
			, { a : 534, b : 23423, c : {
					noodle : 'pie'
					, cake : 'sandwich'
					, parsley : 'boat'
				}
			}
		]
	}
	, fish : [
		{ a : 'penguin' }
		, { a : 'linguine' }
		, { c : 'cow' }
		, { d : [
			{ name : 'the thing'}
			, { name : 'steve dave' }
			, { name : 'the hulk' }
			, { name : null }
			, { name : undefined }
		]}
	]
	, valuesArray : [
		'abcdefg'
		, 'asdfasdf'
		, 'asdf'
		, 'asdf'
	]
};

//console.log(tableify(obj));
assert.equal(tableify(obj) + '\n', html);

