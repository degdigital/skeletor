module.exports = function(grunt) {

    /* Themes configuration */
    var themes = {

        /* Theme configuration */
        default: {
            basePath: ''
        }
    };

    
    /* Default theme configuration */
    var themeDefaults = {

        /* Base path for theme */
        basePath: '',

        /* Source directory configuration */
        'source': {
            basePath: 'source',
            assetPaths: {
                api: 'api',
                css: 'css',
                fonts: 'fonts',
                images: 'images',
                js: 'js',
                patterns: '_patterns',
                patternData: '_data'
            }
        },

        /* Public directory configuration */
        'public': {
            basePath: 'public',
            assetPaths: {
                api: 'api',
                css: 'css',
                fonts: 'fonts',
                images: 'images',
                js: 'js',
                patterns: 'patterns'
            },
            assetUrls: {
                js: '../../js'
            }
        },

        /* Export directory configuration */
        'export': {
            basePath: 'export',
            assetPaths: {
                api: 'api',
                css: 'css',
                fonts: 'fonts',
                images: 'images',
                js: 'js',
                patterns: ''
            },
            assetUrls: {
                js: 'js'
            }
        },

        /* CSS processing configuration */
        css: {

            /* Export CSS source files along with compiled files */
            exportSourceFiles: false,

            /* Enable CSS globbing */
            enableGlobbing: true
        },

        /* Javascript processing configuration */
        js: {

            /* Processor for Javascript [jspm, none] */
            processor: 'jspm',  

            /* When to minify Javascript [always, never, exportOnly] */
            minify: 'exportOnly', 

            /* Enable module bundling for use with JSPM [true, false] */
            enableBundling: true,

            /* Module bundle config for JSPM */
            bundles: {

                /* Name of bundle to exclude from all other bundles */
                defaultExclude: 'main-bundle',

                /* Build self-executing bundles [true, false] */
                selfExecuting: false,

                /* Array of module bundles config objects */
                items: [
                    {
                        /* Name of entry module for this bundle */
                        entry: 'main',

                        /* Array of bundles to exclude from this bundle */
                        exclude: [],

                        /* Array of polyfills for this bundle */
                        polyfills: []
                    }
                ]
            }
        }
    };

    /* Task that runs when a watched file even occurs [build, export] */
    var watchTask = 'build';


    /* EDIT BELOW THIS LINE AT YOUR OWN RISK */
    var themeConfigurer = require('./grunt/lib/themeConfigurer')(grunt);
    themeConfigurer.configureThemes(themes, themeDefaults);
    
    grunt.initConfig({
        themes: themes,
        watchTask: watchTask
    });

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