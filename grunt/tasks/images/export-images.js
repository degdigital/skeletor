module.exports = function(grunt) {

	grunt.registerMultiTask('export-images', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:images_export');
	});

}