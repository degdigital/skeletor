module.exports = function(grunt) {
    
    var skConfig = require('./project-config');

    var themeConfigurer = require('./grunt/lib/themeConfigurer')(grunt);
    themeConfigurer.configureThemes(skConfig.themes, skConfig.themeDefaults);
    
    grunt.initConfig(skConfig);

    var multitaskConfigurer = require('./grunt/lib/multitaskConfigurer')(grunt);
    multitaskConfigurer.configureMultitasks();

    
    grunt.loadTasks('grunt/tasks');
    grunt.loadTasks('grunt/tasks/css');
    grunt.loadTasks('grunt/tasks/js');
    grunt.loadTasks('grunt/tasks/patterns');
    grunt.loadTasks('grunt/tasks/images');
    grunt.loadTasks('grunt/tasks/fonts');
    grunt.loadTasks('grunt/tasks/api');
    grunt.registerTask('default', ['build']);
   
    
    require('time-grunt')(grunt);
};