module.exports = function(grunt) {

	grunt.registerMultiTask('export-images', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.images && activeTheme.export.assetPaths.images) {
			var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'export');
			syncTasksRunner.runTasks();
		}
	});

}