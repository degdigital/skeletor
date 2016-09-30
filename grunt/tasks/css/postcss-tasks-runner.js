module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {
		setProcessors();
		
		var taskTarget = activeTheme.css.enableGlobbing ? 
			parentTask + '_globbing' : 
			parentTask;

		configureFiles(taskTarget);

		grunt.task.run('postcss:' + taskTarget);
	}

	function configureFiles(taskTarget) {
		var filesToProcess = activeTheme.css.files
			.filter(function(file){
				return file.process == 'all' || file.process == parentTask;
			})
			.map(function(file) {
				return file.dest;
			});

		grunt.config('postcss.' + taskTarget + '.src', filesToProcess);
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