module.exports = function(grunt) {

    grunt.registerMultiTask('export-js', function() {
        grunt.config('activeTheme', this.data);
        var activeTheme = grunt.config('activeTheme');

        if(activeTheme.source.assetPaths.js && activeTheme.export.assetPaths.js) {

            require('./lint-task-runner')(grunt, activeTheme.js.linter, 'export').runTasks();
            require('./processor-runner')(grunt, activeTheme, 'export').run();  
        }
    });
}
 
