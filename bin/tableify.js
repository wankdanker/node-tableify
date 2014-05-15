var tableify = require('../');

process.stdin.setEncoding('utf8');

var buf = '';

process.stdin.on('readable', function () {
	buf += process.stdin.read();
});

process.stdin.on('end', function () {
	process.stdout.write(tableify(JSON.parse(buf)));
});

