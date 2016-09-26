module.exports = function(grunt) {

    /******************************************************
    * PATTERN LAB CONFIGURATION
    ******************************************************/
    /*
    var argv = require('minimist')(process.argv.slice(2));

    //read all paths from our namespaced config file
    var plConfig = require('./patternlab-config.json'),
        pl = require('patternlab-node')(plConfig);

    function getConfiguredCleanOption() {
        return plConfig.cleanPublic;
    }

    grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

        if (arguments.length === 0) {
            pl.build(function(){}, getConfiguredCleanOption());
        }

        if(arg) {
            switch(arg) {
                case "version":
                    pl.version();
                    break;
                case "patternsonly":
                    pl.patternsonly(function(){},getConfiguredCleanOption());
                    break;
                case "starterkit-list":
                    pl.liststarterkits();
                    break;
                case "starterkit-load":
                    pl.loadstarterkit(argv.kit);
                    break;
                case "help":
                default:
                    pl.help();
                    break;
            }
        }
      });
    */

    /******************************************************
    * SKELETOR CONFIGURATION
    ******************************************************/

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