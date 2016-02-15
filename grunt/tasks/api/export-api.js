module.exports = function(grunt) {

	grunt.registerMultiTask('export-api', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:api_export');
	});

}