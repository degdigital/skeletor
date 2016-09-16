module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			images_build: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.images %>',
					src: [],
					dest: '<%= activeTheme.public.assetPaths.images %>'
				}],
				updateAndDelete:true,
				verbose: true
			},
			images_export: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.images %>',
					src: [],
					dest: '<%= activeTheme.export.assetPaths.images %>'
				}],
				updateAndDelete:true,
				verbose: true
			}
		}
	});

};