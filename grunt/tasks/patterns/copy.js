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
			    }],
			    "options": {
			        "process": function (content, srcpath) {
			            return content.replace(/<!-- Begin Pattern Lab [\s\S]* End Pattern Lab -->/ig, "")
			                          .replace(/<!-- Begin Pattern Lab JS [\s\S]* End Pattern Lab JS -->/ig, "")
			                          .replace(/\.\.\/\.\.\//g, "")
		                              .replace(/\.css\?[0-9]*/g,".css")
		                              .replace('<link rel="stylesheet" href="css/styleguide.css">', "");
			        }
			    }
			}
		}
	});

}