const rawTasksRunner = function(grunt, processorOptions, parentTask) {
	
	function runTasks() {
		if(processorOptions.files) {
	    	grunt.config('sync.js_' + parentTask + '_raw.files.0.src', processorOptions.files);
	    }
	    grunt.task.run('sync:js_' + parentTask + '_raw');
	    if(grunt.option('minifyJS')) {
			grunt.task.run('uglify:js_' + parentTask + '_raw');
		}
	}

	return {
		runTasks: runTasks
	}
}

module.exports = rawTasksRunner;