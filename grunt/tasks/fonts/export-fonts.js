module.exports = function(grunt) {

	grunt.registerMultiTask('export-fonts', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		if(activeTheme.source.assetPaths.fonts && activeTheme.export.assetPaths.fonts) {
			grunt.task.run('sync:fonts_export');
		}
	});

}