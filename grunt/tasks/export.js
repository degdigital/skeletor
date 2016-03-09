module.exports = function(grunt) {
	
	grunt.registerMultiTask('export', function() {
		grunt.config('activeTheme', this.data);

		grunt.task.run('export-patterns:' + this.target);
		grunt.task.run('export-css:' + this.target);
		grunt.task.run('export-js:' + this.target);
		grunt.task.run('export-images:' + this.target);;
		grunt.task.run('export-fonts:' + this.target);
		grunt.task.run('export-api:' + this.target);
	});

}