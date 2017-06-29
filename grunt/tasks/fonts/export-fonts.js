module.exports = function(grunt) {

	grunt.registerMultiTask('export-fonts', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.fonts && activeTheme.export.assetPaths.fonts) {
			var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'export');
			syncTasksRunner.runTasks();
		}
	});

}