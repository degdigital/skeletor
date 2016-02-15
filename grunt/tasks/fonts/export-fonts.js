module.exports = function(grunt) {

	grunt.registerMultiTask('export-fonts', function() {
		grunt.config('activeTheme', this.data);
		grunt.task.run('sync:fonts_export');
	});

}