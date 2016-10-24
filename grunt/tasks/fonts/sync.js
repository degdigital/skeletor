module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			fonts_build: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.fonts %>',
					src: '**/*',
					dest: '<%= activeTheme.public.assetPaths.fonts %>'
				}],
				updateAndDelete:false,
				verbose: true
			},
			fonts_export: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.fonts %>',
					src: '**/*',
					dest: '<%= activeTheme.export.assetPaths.fonts %>'
				}],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};