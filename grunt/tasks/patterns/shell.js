module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-shell');

	grunt.config.merge({
		shell: {
			options: {
	  			stdout: true
	  		},
	  		patterns: {
	  			command: 'php core/builder.php -gp'
	  		}
	  	}
	});
}