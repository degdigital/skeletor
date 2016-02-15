module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			css_export_source: {
				files: [{
					expand: true,
					cwd: '<%= activeTheme.source.assetPaths.css %>',
					src: ['**/*.css'],
					dest: '<%= activeTheme.export.assetPaths.css %>'
				}],
				updateAndDelete:true,
				verbose: true
			}
		}
	});

};