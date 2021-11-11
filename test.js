var tableify = require('./');
var assert = require('assert');
const testData = require('./test-data');

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
	, twodee : [
		[ 1234, 1234 ]
		, [ 2345, 2345 ]
		, [ 3456, 3456 ]
	]
};

//create a circular reference
obj.fish[0].b = obj.fish;

//console.log(tableify(obj));
//console.log(html);

assert.equal(tableify(obj) + '\n', testData.default);

t = tableify.defaults({ classes : false })

console.log(t(obj))

t = tableify.defaults({ classPrefix : 'tblfy-' })

console.log(t(obj))

// reducer tests
console.log('reducer tests');
t = tableify(obj, {reduceAt: 3});
assert.equal(t + '\n', testData.reduce3);
console.log(t);
t = tableify(obj, {reduceAt: 2});
assert.equal(t + '\n', testData.reduce2);
console.log(t);
t = tableify(obj, {reduceAt: 1});
assert.equal(t + '\n', testData.reduce1);
console.log(t);
