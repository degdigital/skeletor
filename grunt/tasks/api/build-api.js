module.exports = function(grunt) {
	grunt.registerMultiTask('build-api', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:api_build');
	});

}