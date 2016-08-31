module.exports = function(grunt) {

	grunt.registerMultiTask('build-js', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');


		if(typeof grunt.option('minifyJS') === 'undefined' && (activeTheme.js.minify == 'all' || activeTheme.js.minify == 'build')) {
			grunt.option('minifyJS', true);
		}
		
		switch(activeTheme.js.processor) {
			case "none":
				runRawTasks();
				break;
			case "jspm":
				var jspmTaskRunner = require('./jspm-tasks-runner')(grunt, activeTheme, 'build');
				jspmTaskRunner.runTasks();
				break;
		}
	});

	function runRawTasks() {
		grunt.task.run('sync:js_build_raw');
		if(grunt.option('minifyJS')) {
			grunt.task.run('uglify:js_build_raw');
		}
	}
}