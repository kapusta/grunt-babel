# grunt-babel [![Build Status](https://travis-ci.org/babel/grunt-babel.svg?branch=master)](https://travis-ci.org/babel/grunt-babel)

> Use next generation JavaScript, today, with [Babel](https://babeljs.io)

*Issues with the output should be reported on the Babel [issue tracker](https://phabricator.babeljs.io).*


## Install

```
$ npm install --save-dev grunt-babel babel-preset-es2015
```


## Usage

```js
module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask('default', ['babel']);
	grunt.initConfig({
		babel: {
			options: {
				comments: false,
				compact: true,
				sourceMaps: true,
				minified: true,
				presets: ['es2015']
			},
			dist: {
				src: [
					'./src/js/foo.js',
					'./src/js/**/*.js'
				],
				dest: './dist/foo.min.js'
			}
		}
	});
};
```


## Options

See the Babel [options](https://babeljs.io/docs/usage/options), except for `filename` which is handled for you.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
