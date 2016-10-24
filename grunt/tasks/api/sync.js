module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			api_build: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.api %>',
					src: '**/*',
					dest: '<%= activeTheme.public.assetPaths.api %>'
				}],
				updateAndDelete:false,
				verbose: true
			},
			api_export: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.api %>',
					src: '**/*',
					dest: '<%= activeTheme.export.assetPaths.api %>'
				}],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};