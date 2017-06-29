module.exports = function(grunt) {

	grunt.registerMultiTask('export-api', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.api && activeTheme.export.assetPaths.api) {
			var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'export');
			syncTasksRunner.runTasks();
		}
	});

}