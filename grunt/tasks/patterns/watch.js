module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	var path = require('path');
	
	grunt.config.merge({
		watch: {
			patterns: {
				files: [
		            path.normalize('<%= activeTheme.source.assetPaths.patterns %>/**/*.mustache'),
		            path.normalize('<%= activeTheme.source.assetPaths.patterns %>/**/*.json'),
		            path.normalize('<%= activeTheme.source.assetPaths.patternData %>/*.json'),
		            path.normalize('<%= activeTheme.source.assetPaths.patternMeta %>/*.mustache'),
		            path.normalize('<%= activeTheme.source.assetPaths.patternAnnotations %>/*.js')
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