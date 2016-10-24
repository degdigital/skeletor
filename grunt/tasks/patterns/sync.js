module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			patterns_build_styleguide_assets: {
				files: [{
					expand: true,
					cwd: '',
					src: ['**/*'],
					dest: '<%= activeTheme.public.basePath %>/styleguide'
				}],
				ignoreInDest: ['data/**', 'html/**'],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};