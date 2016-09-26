module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-string-replace');

	var path = require('path');

	grunt.config.merge({
		'string-replace': {
			js_build_jspm_config: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.public.assetPaths.js %>'),
					src: 'config.js',
					dest: path.normalize('<%= activeTheme.public.assetPaths.js %>')
				}],
				options: {
					replacements: [
						{
							pattern: /System\.config\({\s*/,
							replacement: 'System.config({baseURL: "<%= activeTheme.public.assetUrls.js %>",'
						}
					]
				}
			},
			js_build_jspm_bundleHelper: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.public.assetPaths.js %>'),
					src: 'bundleHelper.js',
					dest: path.normalize('<%= activeTheme.public.assetPaths.js %>')
				}],
				options: {
					replacements: [
						{
							pattern: /<%=\s*jsUrl\s*%>/g,
							replacement: '<%= activeTheme.public.assetUrls.js %>'
						}
					]
				}

			},
			js_export_jspm_config: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.export.assetPaths.js %>'),
					src: 'config.js',
					dest: path.normalize('<%= activeTheme.export.assetPaths.js %>')
				}],
				options: {
					replacements: [
						{
							pattern: /System\.config\({\s*/,
							replacement: 'System.config({baseURL: "<%= activeTheme.export.assetUrls.js %>",'
						}
					]
				}
			},
			js_export_jspm_bundleHelper: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.export.assetPaths.js %>'),
					src: 'bundleHelper.js',
					dest: path.normalize('<%= activeTheme.export.assetPaths.js %>')
				}],
				options: {
					replacements: [
						{
							pattern: /<%=\s*jsUrl\s*%>/g,
							replacement: '<%= activeTheme.export.assetUrls.js %>'
						}
					]
				}

			}
		}
	});
}