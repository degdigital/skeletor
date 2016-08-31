module.exports = function(grunt, activeTheme, baseTask) {

	function runTasks() {

		configureFiles();

		grunt.task.run('sync:images_' + baseTask);
	}

	function configureFiles() {
		var filesToProcess = activeTheme.images.files
			.filter(function(file){
				return file.process == 'all' || file.process == baseTask;
			})
			.reduce(function(files, file) {
				return files.concat(file.src);
			}, []);

		grunt.config('sync.images_' + baseTask + '.files.0.src', filesToProcess);
	}

	return {
		runTasks: runTasks
	}
}