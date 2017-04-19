'use strict';
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

module.exports = function (grunt) {
	grunt.registerMultiTask('babel', 'Use next generation JavaScript, today', function () {
		var options = this.options();

		this.files.forEach(function (el) {
			delete options.filename;
			delete options.filenameRelative;

			console.log('Converting', el.src.length, 'file(s)');

			var code = el.src.map(function (filePath) {
				var path = (process.platform === 'win32') ? filePath.replace(/\\/g, '/') : filePath;
				return fs.readFileSync(path, 'utf8');
			});

			options.sourceMapTarget = path.basename(el.dest);

			var transformed = babel.transform(code.join('\n'), options);
			var sourceMappingURL = '';

			if (transformed.map) {
				sourceMappingURL = '\n//# sourceMappingURL=' + path.basename(el.dest) + '.map';
			}

			grunt.file.write(el.dest, transformed.code + sourceMappingURL + '\n');

			if (transformed.map) {
				grunt.file.write(el.dest + '.map', JSON.stringify(transformed.map));
			}
		});
	});
};
