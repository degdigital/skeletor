module.exports = function(grunt) {

	grunt.registerMultiTask('build-patterns', function() {
		grunt.config('activeTheme', this.data);
		
		var path = require('path');
		var pathToBuilder = path.join(this.data.basePath, path.normalize('core/builder.php'));
		var command = 'php ' + pathToBuilder + ' -gp';
		grunt.config('shell.patterns.command', command);

		grunt.task.run('shell:patterns');
	});

}