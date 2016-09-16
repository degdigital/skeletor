module.exports = function(grunt) {

	grunt.registerMultiTask('export-images', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'export');
		syncTasksRunner.runTasks();
	});

}