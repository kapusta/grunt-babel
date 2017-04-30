'use strict';
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');

module.exports = function (grunt) {
	grunt.registerMultiTask('babel', 'Use next generation JavaScript, today', function () {
		const options = this.options();

		this.files.forEach(el => {
			delete options.filename;
			delete options.filenameRelative;

			console.log('Converting', el.src.length, 'file(s)');

			const code = el.src.map(filePath => {
				const path = (process.platform === 'win32') ? filePath.replace(/\\/g, '/') : filePath;
				return fs.readFileSync(path, 'utf8');
			});

			options.sourceMapTarget = path.basename(el.dest);

			// Because we use babel.transform() to directly transform a string of code
			// the 'sources' array that would be in the sourcemap is set to 'unknown',
			// so we will assign the sources after doing the transform().
			const transformed = babel.transform(code.join('\n'), options);
			transformed.map.sources = el.src;

			let sourceMappingURL = '';

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
