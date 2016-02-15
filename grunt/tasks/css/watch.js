module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	var path = require('path');

	grunt.config.merge({
		watch: {
			css: {
				files: [
		            path.normalize('<%= activeTheme.source.assetPaths.css %>/**/*.css')
		        ],
		        tasks: ['<%= watchTask %>-css:<%= watchTarget %>'],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});
}