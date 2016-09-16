module.exports = function(grunt) {

	grunt.registerMultiTask('build-css', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		
		var globbingTasksRunner = require('./globbing-tasks-runner')(grunt, activeTheme, 'build');
		globbingTasksRunner.runTasks();

		var postCssTasksRunner = require('./postcss-tasks-runner')(grunt, activeTheme, 'build');
		postCssTasksRunner.runTasks();



	});
}