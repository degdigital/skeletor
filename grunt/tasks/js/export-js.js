module.exports = function(grunt) {

	grunt.registerMultiTask('export-js', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(typeof grunt.option('minifyJS') === 'undefined' && 
			(activeTheme.js.minify == 'always' || activeTheme.js.minify == 'exportOnly')) {
			grunt.option('minifyJS', true);
		}
		
		switch(activeTheme.js.processor) {
			case "none":
				runRawTasks();
				break;
			case "jspm":
				var jspmTaskRunner = require('./jspm-tasks-runner')(grunt, activeTheme, 'export');
				jspmTaskRunner.runTasks();
				break;
		}
	});

	function runRawTasks() {
		grunt.task.run('sync:js_export_raw');
	}
}