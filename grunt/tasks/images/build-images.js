module.exports = function(grunt) {

	grunt.registerMultiTask('build-images', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:images_build');
	});

}