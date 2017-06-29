module.exports = function(grunt) {
	grunt.registerMultiTask('build-api', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.api && activeTheme.public.assetPaths.api) {
			var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'build');
			syncTasksRunner.runTasks();
		}
	});

}