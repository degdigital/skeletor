module.exports = function(grunt) {

	grunt.registerMultiTask('build-images', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.images && activeTheme.public.assetPaths.images) {
			var syncTasksRunner = require('./sync-tasks-runner')(grunt, activeTheme, 'build');
			syncTasksRunner.runTasks();
		}
	});

}