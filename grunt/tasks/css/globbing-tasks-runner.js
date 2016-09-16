module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {

		if(activeTheme.css.enableGlobbing) {
			var filesToProcess = activeTheme.css.files.filter(function(file){
				return file.process == 'all' || file.process == parentTask;
			});

			filesToProcess.forEach(configureFile);
			grunt.task.run('sass_globbing:' + parentTask);
		} 
	}

	function configureFile(cssFile) {

		var destFilepath = getDestinationFilepath(cssFile.dest);	

		var filesToGlob = cssFile.globbingFiles.map(function(sourceFile) {
			return getSourceFilepath(sourceFile);
		});

		var files = grunt.config('sass_globbing.' + parentTask + '.files');
		files = files ? files : {};
		files[destFilepath] = filesToGlob;

		grunt.config('sass_globbing.' + parentTask + '.files', files);
	}	

	function getDestinationFilepath(filename) {
		var path = require('path');

		var basePath = parentTask == 'build' ? activeTheme.public.assetPaths.css : activeTheme.export.assetPaths.css;
		return path.normalize(path.join(basePath, filename));
	}

	function getSourceFilepath(filename) {
		var path = require('path');
		return path.normalize(path.join(activeTheme.source.assetPaths.css, filename));
				
	}

	return {
		runTasks: runTasks
	}
}