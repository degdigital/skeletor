module.exports = function(grunt) {

	grunt.registerMultiTask('listen', function() {
		grunt.config('activeTheme', this.data);
		grunt.config('watchTarget', this.target);

		configureWatchTasks(this.target);
		configureJSWatchTaskFiles();

		grunt.task.run('watch');
	});

	function configureWatchTasks(themeTarget) {
		var watchConfig = grunt.config('watch');
		var listenTasks = grunt.config('listenTasks');
		var activeTheme = grunt.config('activeTheme');

		listenTasks.forEach(function(listenTask) {
			var listenTaskConfig = grunt.config(listenTask + 'Tasks');

			for(var watchTarget in watchConfig) {
				if(listenTaskConfig.indexOf(watchTarget) >= 0 && activeTheme.source.assetPaths[watchTarget]) {
					var watchTargetTask = listenTask + '-' + watchTarget + ':' +  themeTarget;
					watchConfig[watchTarget].tasks.push(watchTargetTask);
				} else {
					delete watchConfig[watchTarget];
				}
			}
		});
		

		grunt.config('watch', watchConfig);
	}

	function configureJSWatchTaskFiles() {
		var path = require('path');
		var activeTheme = grunt.config('activeTheme');

		var files = [
			path.normalize("<%= activeTheme.source.assetPaths.js %>/**/*.js")
		];

		var jspmProcessor = activeTheme.js.processors.find(function(processorObj) {
			return processorObj.processor == 'jspm';
		});

		if(jspmProcessor) {
			files = files.concat([
				path.normalize("!<%= activeTheme.source.assetPaths.js %>/jspm_packages/**/*"),
				path.normalize("!<%= activeTheme.source.assetPaths.js %>/**/*-bundle.js"),
	        	path.normalize("!<%= activeTheme.source.assetPaths.js %>/**/*-bundle-*.js"),
        		path.normalize("!<%= activeTheme.source.assetPaths.js %>/bundleHelper.js")
			]);

			if(jspmProcessor.bundles.selfExecuting == false) {
				files.push(path.normalize("!<%= activeTheme.source.assetPaths.js %>/config.js"));
			}
		}
		
		grunt.config('watch.js.files', files);
	}
}
