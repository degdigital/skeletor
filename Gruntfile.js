module.exports = function(grunt) {

    /* Paths to assets in the source, public, and export directories */
    var paths = {
        'source': {
            api: 'source/api',
            css: 'source/css',
            fonts: 'source/fonts',
            images: 'source/images',
            api: 'source/api',
            js: 'source/js',
            patterns: 'source/_patterns'
        },
        'public': {
            api: 'public/api',
            css: 'public/css',
            fonts: 'public/fonts',
            images: 'public/images',
            api: 'public/api',
            js: 'public/js',
            patterns: 'public/patterns'
        },
        'export': {
            css: 'export/css',
            fonts: 'export/fonts',
            images: 'export/images',
            api: 'export/api',
            js: 'export/js',
            patterns: 'export'
        }
    };

    /* URLs to assets in the public and export directories */
    var urls = {
        'public': {
            js: '../../js'
        },
        'export': {
            js: 'js'
        }
    }

    /* Task that runs when a watched file even occurs [build, export] */
    var watchTask = 'build';

    /* Config settings for CSS processing */
    var css = {

        /* Export CSS source files along with compiled files */
        exportSourceFiles: false
    };

    /* Config settings for Javascript processing */
    var js = {

        /* Processor for Javascript [jspm, raw] */
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
    };
   
    require('load-grunt-config')(grunt, {
        config: {
            paths: paths,
            urls: urls,
            css: css,
            js: js,
            watchTask: watchTask
        }
    });
    
    require('time-grunt')(grunt);
};