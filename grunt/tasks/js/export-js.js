module.exports = function(grunt) {

    grunt.registerMultiTask('export-js', function() {
        grunt.config('activeTheme', this.data);
        var activeTheme = grunt.config('activeTheme');

        if(activeTheme.source.assetPaths.js && activeTheme.export.assetPaths.js) {
            activeTheme.js.processors.forEach(function(processorOptions) {

                if(typeof grunt.option('minifyJS') === 'undefined' && 
                  	(processorOptions.minify == 'all' || processorOptions.minify == 'export')) {
                    grunt.option('minifyJS', true);
                }
                
                switch(processorOptions.processor) {
                    case "none":
                            runRawTasks(processorOptions);
                            break;
                    case "jspm":
                            var jspmTaskRunner = require('./jspm-tasks-runner')(grunt, activeTheme, processorOptions, 'export');
                            jspmTaskRunner.runTasks();
                            break;
                }
            });
        }
    });

    function runRawTasks(processorOptions) {
        if(processorOptions.files) {
                grunt.config('sync.js_export_raw.files.0.src', processorOptions.files);
        }
        grunt.task.run('sync:js_export_raw');

           if(grunt.option('minifyJS')) {
			grunt.task.run('uglify:js_export_raw');
		}
    }
}
 
