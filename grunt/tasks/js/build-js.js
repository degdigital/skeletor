module.exports = function(grunt) {

    grunt.registerMultiTask('build-js', function() {
        grunt.config('activeTheme', this.data);
        var activeTheme = grunt.config('activeTheme');

        if(activeTheme.source.assetPaths.js && activeTheme.public.assetPaths.js) {

            require('./lint-task-runner')(grunt, activeTheme.js.linter, 'build').runTasks();
            require('./processor-runner')(grunt, activeTheme, 'build').run();  
        }
    });

}