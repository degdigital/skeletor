module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	var path = require('path');

	grunt.config.merge({
		watch: {
			js: {
				files: [],
		        tasks: [],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});

	grunt.event.on('watch', function(action, filepath) {
	  grunt.config('modifiedFile', filepath);
	});
}