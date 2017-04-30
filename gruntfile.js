'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		babel: {
			options: {
				sourceMaps: true,
				presets: ['es2015']
			},
			compactFormat: {
				src: ['test/fixtures/fixture.js'],
				dest: 'test/tmp/fixture-compiled.js'
			},
			filesObjectFormat: {
				files: {
					'test/tmp/fixture-compiled.js': ['test/fixtures/*.js']
				}
			},
			filesArrayFormat: {
				files: [
					{
						src: ['test/fixtures/fixture.js'],
						dest: 'test/tmp/fixture-compiled.js'
					}
				]
			}
		},
		nodeunit: {
			tasks: ['test/test.js']
		},
		clean: {
			test: ['test/tmp/**']
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', [
		'clean',
		'babel:compactFormat',
		'nodeunit',
		'clean',
		'babel:filesObjectFormat',
		'nodeunit',
		'clean',
		'babel:filesArrayFormat',
		'nodeunit',
		'clean']
	);
};
