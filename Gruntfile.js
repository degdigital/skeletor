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
        devMode: false,
        defaultExclude: 'main-bundle',
        items: [
            {
              entry: 'main'
            }
        ]
    };

    var task = grunt.cli.tasks.length ? grunt.cli.tasks[0] : null;
    if(task && task.indexOf('deploy') == 0) {
        console.log('setting production to true');
        grunt.config('production', true);
        paths.dest = paths.export;
        urls.dest = urls.export;    
    } else {
        paths.dest = paths.public;
        urls.dest = urls.public;
    }

    require('load-grunt-config')(grunt, {
        config: {
            paths: paths,
            urls: urls,
            bundles: bundles
        }
    });
    
    require('time-grunt')(grunt);
};