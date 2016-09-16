module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
		
	var path = require('path');

	grunt.config.merge({
		sync: {
			js_build_raw: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.js %>',
					src: ['**/*.js'],
					dest: '<%= activeTheme.public.assetPaths.js %>'
				}],
				updateAndDelete:true,
				verbose: true
			},
			js_export_raw: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.js %>',
					src: ['**/*.js'],
					dest: '<%= activeTheme.export.assetPaths.js %>'
				}],
				updateAndDelete:true,
				verbose: true
			},
			js_build_jspm_bundled: {
				files: [{
				  cwd: '<%= activeTheme.source.assetPaths.js %>',
				  src: [
				  	path.normalize("polyfills/picturefill.js"),
					path.normalize('**/*-bundle.js'),
					path.normalize("jspm_packages/system.js"),
		            path.normalize("jspm_packages/system-polyfills.js")
				  ],
				  dest: '<%= activeTheme.public.assetPaths.js %>'
				}],
				ignoreInDest: path.normalize('**/*-bundle-*.js'),
				updateAndDelete:true,
				verbose: true
			},
			js_build_jspm_bundled_sfx: {
				files: [{
				  cwd: '<%= activeTheme.source.assetPaths.js %>',
				  src: [
				  	path.normalize("polyfills/picturefill.js"),
					path.normalize('**/*-bundle.js')
				  ],
				  dest: '<%= activeTheme.public.assetPaths.js %>'
				}],
				updateAndDelete:true,
				verbose: true,
				compareUsing: "md5"
			},
			js_build_jspm_unbundled: {
				files: [{
				  cwd: '<%= activeTheme.source.assetPaths.js %>',
				  src: [
				  	path.normalize('**/*.js'),
				  	'!bundleHelper.js',
				  	'!polyfillTests.js'
				  ],
				  dest: '<%= activeTheme.public.assetPaths.js %>'
				}],
				ignoreInDest: path.normalize('**/*-bundle-*.js'),
				updateAndDelete:true,
				verbose: true
			},
			js_export_jspm_bundled: {
				files: [
					{
					  cwd: '<%= activeTheme.source.assetPaths.js %>',
					  src: [
					  	path.normalize("polyfills/picturefill.js"),
						path.normalize('**/*-bundle.js'),
						path.normalize("jspm_packages/system.js"),
			            path.normalize("jspm_packages/system-polyfills.js")
					  ],
					  dest: '<%= activeTheme.export.assetPaths.js %>'
					}
					
				],
				updateAndDelete:true,
				verbose: true
			},
			js_export_jspm_bundled_sfx: {
				files: [
					{
					  cwd: '<%= activeTheme.source.assetPaths.js %>',
					  src: [
					  	path.normalize("polyfills/picturefill.js"),
						path.normalize('**/*-bundle.js')
					  ],
					  dest: '<%= activeTheme.export.assetPaths.js %>'
					}
				],
				updateAndDelete:true,
				verbose: true
			}
		}
	});

};