module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	var path = require('path');

	grunt.config.merge({
		watch: {
			fonts: {
				files: [
		            path.normalize('<%= activeTheme.source.assetPaths.fonts %>/**/*')
		        ],
		        tasks: ['<%= watchTask %>-fonts:<%= watchTarget %>'],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});
}