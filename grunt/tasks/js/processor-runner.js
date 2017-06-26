const processorRunner = function(grunt, activeTheme, parentTask) {
	
	function run() {
		activeTheme.js.processors.forEach(function(processorOptions) {
	        if(typeof grunt.option('minifyJS') === 'undefined' && 
	            (processorOptions.minify == 'all' || processorOptions.minify == parentTask)) {
	            grunt.option('minifyJS', true);
	        }
	        
	        switch(processorOptions.type) {
	            case "none":
	            	var rawTasksRunner = require('./raw-tasks-runner')(grunt, processorOptions, parentTask);
	                rawTasksRunner.runTasks();
	                break;
	            case "jspm":
	                var jspmTaskRunner = require('./jspm-tasks-runner')(grunt, activeTheme, processorOptions, parentTask);
	                jspmTaskRunner.runTasks();
	                break;
	        }
	    });
	}

    return {
    	run: run
    }

}

module.exports = processorRunner;