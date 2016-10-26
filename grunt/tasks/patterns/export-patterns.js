module.exports = function(grunt) {
	grunt.registerMultiTask('export-patterns', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.patterns && activeTheme.export.assetPaths.patterns) {
			grunt.task.run('build-patterns:' + this.target);
			grunt.task.run('copy:patterns_export');
			grunt.task.run('prettify:patterns_export');
		}
	});
}
