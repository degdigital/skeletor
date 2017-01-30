module.exports = function(grunt) {
	grunt.registerMultiTask('export-patterns', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.patterns && activeTheme.export.assetPaths.patterns) {
			grunt.task.run('build-patterns:' + this.target);

			configureCopy(activeTheme);
			grunt.task.run('copy:patterns_export');
			
			grunt.task.run('prettify:patterns_export');
		}
	});

	function configureCopy(activeTheme) {
		let patternExportProcessor = require("../../lib/patterns/pattern-export-processor")(activeTheme);
		grunt.config('copy.patterns_export.options.process', patternExportProcessor.processPattern);
	}
}
