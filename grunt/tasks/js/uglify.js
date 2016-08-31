module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');

	var path = require('path');

	grunt.config.merge({
		uglify: {
			js_build_raw: {
				files: [{
			        expand: true,
			        cwd: '<%= activeTheme.public.assetPaths.js %>',    
			        src: ['**/*.js'],            
			        dest: '<%= activeTheme.public.assetPaths.js %>'
			    }]   
			},
			js_export_raw: {
				files: [{
			        expand: true,
			        cwd: '<%= activeTheme.export.assetPaths.js %>',    
			        src: ['**/*.js'],            
			        dest: '<%= activeTheme.export.assetPaths.js %>'
			    }]   
			},
			js_build_jspm_bundled: {
	  			files: [{
			        expand: true,
			        cwd: '<%= activeTheme.public.assetPaths.js %>',    
			        src: [
			        		'**/*-bundle.js', 
			        		'**/*-bundle-*.js', 
			        		'config.js', 
			        		'bundleHelper.js'
			        	],            
			        dest: '<%= activeTheme.public.assetPaths.js %>'
			    }]   
			},
	  		js_export_jspm_bundled: {
	  			files: [{
			        expand: true,
			        cwd: '<%= activeTheme.export.assetPaths.js %>',    
			        src: [
			        		'**/*-bundle.js', 
			        		'**/*-bundle-*.js', 
			        		'config.js', 
			        		'bundleHelper.js'
			        	],           
			        dest: '<%= activeTheme.export.assetPaths.js %>'
			    }]   
			}
	  	}
	});
}