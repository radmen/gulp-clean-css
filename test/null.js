'use strict';
var test = require('tape'),
		Vinyl = require('vinyl'),
		gulpCleanCSS = require('../');
	
var testFile1 = new Vinyl({
	cwd: "/home/radmen/broken-promises/",
	base: "/home/radmen/broken-promises/test",
	path: "/home/radmen/broken-promises/test/test1.css",
	contents: null
});

test('should leave null files as is', function(t) {
	t.plan(6);

	var stream = gulpCleanCSS();

	stream.on('data', function(newFile) {
		t.ok(newFile, 'emits a file');
		t.ok(newFile.path, 'file has a path');
		t.ok(newFile.relative, 'file has relative path information');
		t.ok(!newFile.contents, 'file does not have contents');

		t.ok(newFile instanceof Vinyl, 'file is Vinyl');

		t.equals(newFile.contents, null);
	});

	stream.write(testFile1);
});
