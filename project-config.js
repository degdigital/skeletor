module.exports = {

    /* Themes configuration */
    themes: {

        /* Theme configuration */
        default: {
            basePath: ''
        }
    },
    
    /* Default theme configuration */
    themeDefaults: {

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

                     
            /* Globbing configuration */  
            globbing: {

                /* Enable CSS globbing */  
                enableGlobbing: true,

                /* Globbing output files */
                files: {
                    "global.css": [
                        'utilities/**/*.css',
                        'atoms/**/*.css',                  
                        'molecules/**/*.css',
                        'organisms/**/*.css',
                        'templates/**/*.css'
                    ]
                }
                
            },

            /* PostCSS configuration */
            postcss: {

                /* Enable source maps */
                map: false
            }
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
        },

        /* File watching options */
        listen: {

            /* live reloading options */
            livereload: false
        }
    },

    /* Tasks that run on a build */
    buildTasks: ['patterns', 'css', 'js', 'images', 'fonts', 'api'],

    /* Tasks that run on an export */
    exportTasks: ['patterns', 'css', 'js', 'images', 'fonts', 'api'],

    /* Tasks that runs when a watched file event occurs [build, export] */
    listenTasks: ['build']
};