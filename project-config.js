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
                patternAnnotations: '_annotations',
                patternMeta: '_meta',
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
                api: '../../api',
                css: '../../css',
                fonts: '../../fonts',
                images: '../../images',
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
                api: 'api',
                css: 'css',
                fonts: 'fonts',
                images: 'images',
                js: 'js'
            }
        },

        /* CSS processing configuration */
        css: {

            /* Export CSS source files along with compiled files */
            exportSourceFiles: false,

            /* CSS files to be processed */
            files: [
                {
                    /* Destination file name */
                    dest: "global.css",

                    /* When to process file [all, build, export] */
                    process: 'all'
                }
            ],

            /* PostCSS configuration */
            postcss: {

                /* Enable source maps */
                map: false,

                /* PostCSS processor configuration */
                processors: [
                    { name: 'postcss-easy-import'},
                    { name: 'postcss-mixins' },
                    { name: 'postcss-custom-properties'},
                    { name: 'postcss-place'},
                    { name: 'postcss-custom-selectors'},
                    { name: 'postcss-custom-media'},
                    { name: 'postcss-calc'},
                    { name: 'postcss-color-function'},
                    { name: 'postcss-nested'},
                    { name: 'autoprefixer' },
                    { name: 'csswring'}
                ]
            }
        },

        /* Image processing configuration */
        images: {

            /* Image files to be processed */
            files: [
                {
                    /* When to process file [all, build, export] */
                    process: 'all',

                    /* Files and directories to be processed */
                    src: '**/*'
                },
                {
                    process: 'export',
                    src: ['!**/samples/**']
                }
            ]
        },

        /* Javascript Configuration */
        js: {

            /* Enable Javascript Linting [all, build, export] */
            linter: {
                enable: 'all'
            },

            /* Javscript Processor Configuration */
            processors: [
                {

                    /* Processor type [jspm, none] */
                    type: 'jspm',

                    /* When to minify Javascript [all, build, export] */
                    minify: 'export',

                    /* Enable module bundling for use with JSPM [true, false] */
                    enableBundling: true,

                    /* Module bundle config for JSPM */
                    bundles: {

                        /* Name of module to exclude from all other bundles */
                        defaultExclude: 'main',

                        /* Build self-executing bundles [true, false] */
                        selfExecuting: false,

                        /* Array of module bundles config objects */
                        items: [
                            {
                                /* Name of entry module for this bundle */
                                entry: 'main',

                                /* Array of modules to exclude from this bundle */
                                exclude: [],

                                /* Array of polyfills for this bundle */
                                polyfills: []
                            }
                        ]
                    }
                }
            ]
        },

        patterns: {
            plConfig: {},
            'export': [
                {
                    patternType: 'pages',
                    patterns: '*',
                    dest: '' 
                }
            ]
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

    /* Tasks that run when a watched file event occurs [build, export] */
    listenTasks: ['build'],

    /* Tasks that run on a lint */
    lintTasks: ['js']
};