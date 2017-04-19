'use strict';
module.exports = function (grunt) {
	grunt.initConfig({
		babel: {
			options: {
				sourceMaps: true,
				presets: ['es2015']
			},
			test: {
				src: ['test/fixtures/fixture.js'],
				dest: 'test/tmp/fixture-compiled.js'
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

	grunt.registerTask('default', ['clean', 'babel', 'nodeunit', 'clean']);
};
