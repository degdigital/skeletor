const lintTaskRunner = function(grunt, linterOptions, parentTask) {
	
	function runTasks() {
		if(linterOptions && (linterOptions.enable === 'all' || linterOptions.enable === parentTask)) {
	        const modifiedFile = grunt.config('modifiedFile');

	        if(typeof modifiedFile !== 'undefined') {
	            const path = require('path');
	            grunt.config('eslint.single.src', [path.normalize(modifiedFile)]);
	            grunt.task.run('eslint:single');
	        } else {
	            grunt.task.run('eslint:all');
	        }
	    }
	}

	return {
		runTasks: runTasks
	}
}

module.exports = lintTaskRunner;