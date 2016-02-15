module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	var path = require('path');

	grunt.config.merge({
		watch: {
			js: {
				files: [],
		        tasks: ['<%= watchTask %>-js:<%= watchTarget %>'],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});
}