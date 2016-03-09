module.exports = function(grunt) {

	grunt.registerMultiTask('build', function() {
		grunt.config('activeTheme', this.data);
		
   		grunt.task.run('build-patterns:' + this.target);
		grunt.task.run('build-css:' + this.target);
		grunt.task.run('build-js:' + this.target);;
		grunt.task.run('build-images:' + this.target);
		grunt.task.run('build-fonts:' + this.target);
		grunt.task.run('build-api:' + this.target);
	});

}