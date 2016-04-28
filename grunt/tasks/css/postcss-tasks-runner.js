module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {
		setProcessors();

		if(activeTheme.css.enableGlobbing) {
			grunt.task.run('sass_globbing:' + parentTask);
			grunt.task.run('postcss:' + parentTask + '_globbing');
		} else {
			grunt.task.run('postcss:' + parentTask);
		}
	}

	function setProcessors() {
		var processorBuilder = require('../../lib/postcss/processor-builder')(activeTheme, grunt.config('themes'));

		processorInstances = processorBuilder.buildProcessors();

		grunt.config('postcss.options.processors', processorInstances);
	}
	

	return {
		runTasks: runTasks
	}
}