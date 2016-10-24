module.exports = function(grunt) {

	grunt.registerMultiTask('build-fonts', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.fonts && activeTheme.public.assetPaths.fonts) {
			grunt.task.run('sync:fonts_build');
		}
	});

}