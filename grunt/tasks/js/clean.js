module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');

	var path = require('path');

	grunt.config.merge({
		clean: {
	  		js_jspm_bundles: [
	  			path.normalize('<%= activeTheme.source.assetPaths.js %>/**/*-bundle.js'),
    			path.normalize('<%= activeTheme.source.assetPaths.js %>/**/*-bundle-*.js'),
    			path.normalize("!<%= activeTheme.source.assetPaths.js %>/jspm_packages/**/*")
	  		]
	  	}
	});
}