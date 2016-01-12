module.exports = function(grunt) {

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

    var urls = {
        'public': {
            js: '../../js'
        },
        'export': {
            js: 'js'
        }
    }

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
            urls: urls,
            bundles: bundles
        }
    });
    
    require('time-grunt')(grunt);

};