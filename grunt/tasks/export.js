module.exports = function(grunt) {
	
	grunt.registerMultiTask('export', function() {
		grunt.config('activeTheme', this.data);

		grunt.task.run('export-patterns');
		grunt.task.run('export-css');
		grunt.task.run('export-js');
		grunt.task.run('export-images');
		grunt.task.run('export-fonts');
		grunt.task.run('export-api');
	});

}