module.exports = function(grunt) {

	grunt.registerMultiTask('build-fonts', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:fonts_build');
	});

}