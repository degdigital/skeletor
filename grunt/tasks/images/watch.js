module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	var path = require('path');

	grunt.config.merge({
		watch: {
			images: {
				files: [
		            path.normalize('<%= activeTheme.source.assetPaths.images %>/**/*')
		        ],
		        tasks: [],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});
}