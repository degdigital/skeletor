module.exports = function(grunt) {

	grunt.registerMultiTask('export-css', function() {
		grunt.config('activeTheme', this.data);

		var activeTheme = grunt.config('activeTheme');

		var postCssTasksRunner = require('./postcss-tasks-runner')(grunt, activeTheme, 'export');
		postCssTasksRunner.runTasks();

		if(activeTheme.css.exportSourceFiles) {
			grunt.task.run('sync:css_export_source');
		}
	});

}