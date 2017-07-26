module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.config.merge({
		copy: {
			"patterns_export": {}
		}
	});
}