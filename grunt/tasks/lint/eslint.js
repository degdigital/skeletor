module.exports = function(grunt) {
	grunt.loadNpmTasks('gruntify-eslint');

	var path = require('path');


	grunt.config.merge({
		eslint: {
			lint_js: {
				src: [
					path.normalize('<%= activeTheme.source.assetPaths.js %>/**/*.js'),
    				path.normalize("!<%= activeTheme.source.assetPaths.js %>/jspm_packages/**/*"),
    				path.normalize("!<%= activeTheme.source.assetPaths.js %>/polyfills/**/*"),
    				path.normalize("!<%= activeTheme.source.assetPaths.js %>/bundleHelper.js"),
    				path.normalize("!<%= activeTheme.source.assetPaths.js %>/config.js"),
    				path.normalize("!<%= activeTheme.source.assetPaths.js %>/polyfillTests.js")
				],
				options: {
					rulePaths: ['/']
		        }	
			}
	  	}
	});
}