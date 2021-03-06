'use strict';
var test = require('tape'),
		Vinyl = require('vinyl'),
		gulpCleanCSS = require('../');
	
var testContentsInput = 'function errorFunction(error) {';

var testFile1 = new Vinyl({
	cwd: "/home/radmen/broken-promises/",
	base: "/home/radmen/broken-promises/test",
	path: "/home/radmen/broken-promises/test/test1.css",
	contents: new Buffer(testContentsInput)
});

test('should minify files', function(t) {
	t.plan(7);

	var stream = gulpCleanCSS();

	stream.on('data', function(newFile) {
		t.ok(newFile, 'emits a file');
		t.ok(newFile.path, 'file has a path');
		t.ok(newFile.relative, 'file has relative path information');
		t.ok(newFile.contents, 'file has contents');

		t.ok(newFile instanceof Vinyl, 'file is Vinyl');
		t.ok(newFile.contents instanceof Buffer, 'file contents are a buffer');

		t.equals(String(newFile.contents), testContentsInput);
	});

	stream.write(testFile1);
});
