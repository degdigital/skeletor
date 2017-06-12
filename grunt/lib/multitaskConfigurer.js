module.exports = function(grunt) {

	function configureMultitasks(themes) {
		var tasks = ['build', 'export', 'listen', 'lint'];
		var subTasks = ['api', 'css', 'fonts', 'images', 'js', 'patterns'];
		var themes = grunt.config('themes');

		var buildTargets = {};
		for(var name in themes) {
			buildTargets[name] = themes[name];
		}

		tasks.forEach(function(task) {
			grunt.config(task, buildTargets);

			subTasks.forEach(function(subTask) {
				grunt.config(task + '-' + subTask, buildTargets);
			});
		});
	}

	return {
		configureMultitasks: configureMultitasks
	}
	
}