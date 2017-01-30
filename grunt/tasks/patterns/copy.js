module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');

	var path = require('path');

	grunt.config.merge({
		copy: {
			"patterns_export": {
				"files": [{
			        "expand": true,
			        "cwd": "<%= activeTheme.public.assetPaths.patterns %>",
			        "src": ["**/*-pages-*.html", "!**/*-pages-*.markup-only.html"],
			        "dest": path.normalize("<%= activeTheme.export.assetPaths.patterns %>/"),
			        "flatten": true,
			        "filter": 'isFile',
			        "rename": function(dest, src) {
			            return dest + src.substr(12);
			        }
			    }]
			}
		}
	});
}