module.exports = function(grunt, activeTheme, parentTask) {

	function runTasks() {

		if(activeTheme.css.globbing && activeTheme.css.globbing.enableGlobbing) {
			configureFiles();

			grunt.task.run('sass_globbing:' + parentTask);
		} 
	}

	function configureFiles() {

		var files = {};
		var filesFromTheme = activeTheme.css.globbing.files;		

		for(var dest in filesFromTheme) {
			
			var destFilepath = getDestinationFilepath(dest);

			files[destFilepath] = filesFromTheme[dest].map(function(sourceFile) {
				return getSourceFilepath(sourceFile);
			});
		}

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