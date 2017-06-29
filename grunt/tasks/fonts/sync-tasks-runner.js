module.exports = function(grunt, activeTheme, baseTask) {

	function runTasks() {

		const filesConfigurer = require('../../lib/staticAssets/filesConfigurer');
		const filesConfig = filesConfigurer.configure('fonts', activeTheme, grunt.config('themes'), baseTask);

		grunt.config('sync.fonts.files', filesConfig);

		grunt.task.run('sync:fonts');
	}

	return {
		runTasks: runTasks
	}
}