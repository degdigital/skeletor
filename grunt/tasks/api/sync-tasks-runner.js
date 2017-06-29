module.exports = function(grunt, activeTheme, baseTask) {

	function runTasks() {

		const filesConfigurer = require('../../lib/staticAssets/filesConfigurer');
		const filesConfig = filesConfigurer.configure('api', activeTheme, grunt.config('themes'), baseTask);

		grunt.config('sync.api.files', filesConfig);

		grunt.task.run('sync:api');
	}

	return {
		runTasks: runTasks
	}
}