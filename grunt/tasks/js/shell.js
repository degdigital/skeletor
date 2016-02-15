module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-shell');

	grunt.config.merge({
		shell: {
	  		js_build_jspm_bundle: {
	  			options: {
		  			stdout: true
		  		},
	  			command: ''
	  		},
	  		js_build_jspm_unbundle: {
	  			options: {
		  			stdout: true
		  		},
	  			command: ''
	  		}
	  	}
	});
}