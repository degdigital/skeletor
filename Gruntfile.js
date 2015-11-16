module.exports = function(grunt) {

    var paths = {
        src: {
            api: 'source/api',
            css: 'source/css',
            fonts: 'source/fonts',
            images: 'source/images',
            js: 'source/js',
            patterns: 'source/_patterns'
        },
        dist: {
            api: 'public/api',
            css: 'public/css',
            fonts: 'public/fonts',
            images: 'public/images',
            js: 'source/js',
            patterns: 'public/patterns'
        },
        pub: {
            js: 'public/js'
        },
        app: {
            css: 'export/css',
            fonts: 'export/fonts',
            images: 'export/images',
            js: 'export/js',
            patterns: 'export/patterns'
        }
    };

    var bundles = {
        defaultExclude: 'main-bundle',
        items: [
            {
              entry: 'main'
            }
        ]
    };


    require('load-grunt-config')(grunt, {
        config: {
            paths: paths,
            bundles: bundles
        }
    });
    
    require('time-grunt')(grunt);

};