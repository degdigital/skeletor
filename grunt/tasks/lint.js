module.exports = function(grunt) {

	grunt.registerMultiTask('lint', function() {
		grunt.config('activeTheme', this.data);
		
   		var tasks = grunt.config('lintTasks');

		tasks.forEach(function(task) {
			grunt.task.run('lint-' + task);
		});
	});

}