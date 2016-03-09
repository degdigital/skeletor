module.exports = function(grunt) {

	grunt.registerMultiTask('build', function() {
		grunt.config('activeTheme', this.data);
		
   		var tasks = grunt.config('buildTasks');
		var target = this.target;

		tasks.forEach(function(task) {
			grunt.task.run('build-' + task + ':' + target);
		});
	});

}