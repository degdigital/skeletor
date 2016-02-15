module.exports = function(grunt) {

	grunt.registerMultiTask('build', function() {
		grunt.config('activeTheme', this.data);
		
   		grunt.task.run('build-patterns');
		grunt.task.run('build-css');
		grunt.task.run('build-js');
		grunt.task.run('build-images');
		grunt.task.run('build-fonts');
		grunt.task.run('build-api');
	});

}