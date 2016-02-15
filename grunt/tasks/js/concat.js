module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');

	var path = require('path');

	grunt.config.merge({
		concat: {
			js_build_jspm_config: {
				src: [
					path.normalize('<%= activeTheme.source.assetPaths.js %>/config.js'),
					path.normalize('<%= activeTheme.source.assetPaths.js %>/bundleHelper.js')
				],
				dest: path.normalize('<%= activeTheme.public.assetPaths.js %>/config.js')
			},
			js_build_jspm_bundle_polyfills: {},
			js_export_jspm_config: {
				src: [
					path.normalize('<%= activeTheme.source.assetPaths.js %>/config.js'),
					path.normalize('<%= activeTheme.source.assetPaths.js %>/bundleHelper.js')
				],
				dest: path.normalize('<%= activeTheme.export.assetPaths.js %>/config.js')
			},
		}
	});
}