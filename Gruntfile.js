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

    /* Tasks that run on a build */
    var buildTasks = ['patterns', 'css', 'js', 'images', 'fonts', 'api'];

    /* Tasks that run on an export */
    var exportTasks = ['patterns', 'css', 'js', 'images', 'fonts', 'api'];

    /* Tasks that runs when a watched file event occurs [build, export] */
    var listenTasks = ['build'];


    /* EDIT BELOW THIS LINE AT YOUR OWN RISK */
    var themeConfigurer = require('./grunt/lib/themeConfigurer')(grunt);
    themeConfigurer.configureThemes(themes, themeDefaults);
    
    grunt.initConfig({
        themes: themes,
        listenTasks: listenTasks,
        buildTasks: buildTasks,
        exportTasks: exportTasks
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