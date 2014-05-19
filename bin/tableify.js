#!/usr/bin/node

var tableify = require('../');
var argv = require('optimist').argv;
var fs = require('fs');

process.stdin.setEncoding('utf8');

var buf = '';

process.stdin.on('readable', function () {
	buf += process.stdin.read() || "";
});

process.stdin.on('end', function () {
	if (argv.style) {
		var css = fs.readFileSync(__dirname + '/../style.css');
		process.stdout.write('<style>' + css + '</style>');
	}

	process.stdout.write(tableify(JSON.parse(buf)));
});


