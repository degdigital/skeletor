module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-sass-globbing');

	var path = require('path');

	var src = [
				path.normalize("<%= activeTheme.source.assetPaths.css %>/utilities/**/*.css"),
				path.normalize("<%= activeTheme.source.assetPaths.css %>/atoms/**/*.css"),	    			
				path.normalize("<%= activeTheme.source.assetPaths.css %>/molecules/**/*.css"),
				path.normalize("<%= activeTheme.source.assetPaths.css %>/organisms/**/*.css"),
				path.normalize("<%= activeTheme.source.assetPaths.css %>/templates/**/*.css")
			];

	grunt.config('sass_globbing', {
		"build": {	
				src: src,
				dest: path.normalize("<%= activeTheme.public.assetPaths.css %>/global.css")
		   	  
		},
		"export": {	
				src: src,
				dest: path.normalize("<%= activeTheme.export.assetPaths.css %>/global.css")
		   	  
		}
	});
}