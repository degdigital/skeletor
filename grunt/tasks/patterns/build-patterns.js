module.exports = function(grunt) {

	grunt.registerMultiTask('build-patterns', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');
		
		configureShellCommand();

		if(activeTheme.listen.livereload) {
			configureLiveReloadStringReplace();
			grunt.task.run('string-replace:livereload_add_script');
		}
		
		grunt.task.run('shell:patterns');

		if(activeTheme.listen.livereload) {
			grunt.task.run('string-replace:livereload_remove_script');
		}
	});

	function configureShellCommand() {
		var activeTheme = grunt.config('activeTheme');

		var path = require('path');
		var pathToBuilder = path.join(activeTheme.basePath, path.normalize('core/builder.php'));
		var command = 'php ' + pathToBuilder + ' -gp';
		grunt.config('shell.patterns.command', command);
	}

	function configureLiveReloadStringReplace() {
		var activeTheme = grunt.config('activeTheme')
		var stringReplaceLiveReloadReplacement = require('../../lib/patterns/string-replace-livereload-replacement')(activeTheme);
		
		grunt.config('string-replace.livereload_add_script.options.replacements', [stringReplaceLiveReloadReplacement.buildAddScriptReplacement()]);
		
		grunt.config('string-replace.livereload_remove_script.options.replacements', [stringReplaceLiveReloadReplacement.buildRemoveScriptReplacement()]);	
	}



}