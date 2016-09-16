module.exports = function(grunt) {

	grunt.registerMultiTask('build-images', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'build');
		syncTasksRunner.runTasks();
	});

}