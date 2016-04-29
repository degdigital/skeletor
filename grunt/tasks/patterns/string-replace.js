module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-string-replace');

	var path = require('path');

	grunt.config.merge({
		'string-replace': {
			livereload_add_script: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.source.assetPaths.patterns %>/00-atoms/00-meta'),
					src: '_01-foot.mustache',
					dest: path.normalize('<%= activeTheme.source.assetPaths.patterns %>/00-atoms/00-meta')
				}],
				options: {
					replacements: []
				}
			},
			livereload_remove_script: {
				files: [{
					expand: true,
      				cwd: path.normalize('<%= activeTheme.source.assetPaths.patterns %>/00-atoms/00-meta'),
					src: '_01-foot.mustache',
					dest: path.normalize('<%= activeTheme.source.assetPaths.patterns %>/00-atoms/00-meta')
				}],
				options: {
					replacements: []
				}

			}
		}
	});
}