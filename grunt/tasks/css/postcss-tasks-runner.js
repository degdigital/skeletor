module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {
		configureImportPath();

		if(activeTheme.css.enableGlobbing) {
			grunt.task.run('sass_globbing:' + parentTask);
			grunt.task.run('postcss:' + parentTask + '_globbing');
		} else {
			grunt.task.run('postcss:' + parentTask);
		}
	}

	function configureImportPath() {
		var importPathConfigurer = require('../../lib/postcss/import-path-configurer')();
		var path = importPathConfigurer.configureImportPath(activeTheme, grunt.config('themes'));
		var importProcessor = require("postcss-import")({path: path});
		grunt.config('postcss.options.processors.0', importProcessor);
	}

	return {
		runTasks: runTasks
	}
}