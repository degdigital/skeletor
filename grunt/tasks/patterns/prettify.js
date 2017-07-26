module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-prettify');

	var path = require('path');

	grunt.config.merge({
		prettify: {
			"patterns_export": {
				options: {
			    	'indent': 4
			    },
			    files: [{
				    expand: true,
				    cwd: path.normalize('<%= activeTheme.export.assetPaths.patterns %>'),
				    ext: '.html',
				    src: [path.normalize('**/*.html')],
				    dest: path.normalize('<%= activeTheme.export.assetPaths.patterns %>')
			    }]
			}
		}
	});

}