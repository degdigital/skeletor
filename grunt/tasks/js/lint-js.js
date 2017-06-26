module.exports = function(grunt) {

    grunt.registerMultiTask('lint-js', function() {
        grunt.config('activeTheme', this.data);
        var activeTheme = grunt.config('activeTheme');

        if(activeTheme.source.assetPaths.js) {
            grunt.task.run('eslint:all');
        }

    });
}