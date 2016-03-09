module.exports = function(grunt) {
	
	grunt.registerMultiTask('export', function() {
		grunt.config('activeTheme', this.data);

		var tasks = grunt.config('exportTasks');
		var target = this.target;

		tasks.forEach(function(task) {
			grunt.task.run('export-' + task + ':' + target);
		});
	});

}