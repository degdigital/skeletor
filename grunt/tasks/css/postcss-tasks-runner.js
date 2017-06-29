module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {
		setProcessors();
		
		configureFiles(parentTask);
		grunt.task.run('postcss:' + parentTask);
	}

	function configureFiles(parentTask) {
		var filesToProcess = activeTheme.css.files
			.filter(function(file){
				return file.process == 'all' || file.process == parentTask;
			})
			.map(function(file) {
				return file.dest;
			});

		grunt.config('postcss.' + parentTask + '.src', filesToProcess);
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