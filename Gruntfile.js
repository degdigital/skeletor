module.exports = function(grunt) {

    var paths = {
        src: {
            api: 'source/api',
            css: 'source/css',
            fonts: 'source/fonts',
            images: 'source/images',
            js: 'source/js/src',
            patterns: 'source/_patterns'
        },
        trans: {
            js: 'source/js/trans',
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


    require('load-grunt-config')(grunt, {
        config: {
            paths: paths
        }
    });
    
    require('time-grunt')(grunt);

};