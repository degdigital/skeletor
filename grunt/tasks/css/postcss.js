module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-postcss');

	grunt.config('postcss', {
		options: {
            map: '<%= activeTheme.css.postcss.map %>',
            processors: []
        },
        build_globbing: {
            expand: true,
            cwd: '<%= activeTheme.public.assetPaths.css %>',
            src: ['*.css'],
            dest: '<%= activeTheme.public.assetPaths.css %>',
            ext: '.css'
        },
        build: {
            expand: true,
            cwd: '<%= activeTheme.source.assetPaths.css %>',
            src: ['*.css'],
            dest: '<%= activeTheme.public.assetPaths.css %>',
            ext: '.css'
        },
        export_globbing: {
            expand: true,
            cwd: '<%= activeTheme.export.assetPaths.css %>',
            src: ['*.css'],
            dest: '<%= activeTheme.export.assetPaths.css %>',
            ext: '.css'
        },
        export: {
            expand: true,
            cwd: '<%= activeTheme.source.assetPaths.css %>',
            src: ['*.css'],
            dest: '<%= activeTheme.export.assetPaths.css %>',
            ext: '.css'
        }
	});
};