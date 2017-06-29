module.exports = function(grunt) {

	grunt.registerMultiTask('build-css', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.css && activeTheme.public.assetPaths.css) {
			var postCssTasksRunner = require('./postcss-tasks-runner')(grunt, activeTheme, 'build');
			postCssTasksRunner.runTasks();
		}
	});
}