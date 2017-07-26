module.exports = function(grunt) {

	const path = require('path');		

	grunt.registerMultiTask('listen', function() {
		grunt.config('activeTheme', this.data);
		grunt.config('watchTarget', this.target);

		configureWatchTasks(this.target);		

		grunt.task.run('watch');
	});

	function configureWatchTasks(themeTarget) {
		const watchConfig = grunt.config('watch');
		const listenTasks = grunt.config('listenTasks');
		const activeTheme = grunt.config('activeTheme');
		const themes = grunt.config('themes');

		listenTasks.forEach(function(listenTask) {
			const listenTaskConfig = grunt.config(listenTask + 'Tasks');
			
			for(var watchTarget in watchConfig) {
				if(listenTaskConfig.indexOf(watchTarget) >= 0 && activeTheme.source.assetPaths[watchTarget]) {
					var watchTargetTask = listenTask + '-' + watchTarget + ':' +  themeTarget;
					watchConfig[watchTarget].tasks.push(watchTargetTask);
					if(watchTarget !== 'patterns') {
						watchConfig[watchTarget].files = createAssetWatchTaskFiles(watchTarget, activeTheme, themes);
					}
				} else {
					delete watchConfig[watchTarget];
				}
			}
		});
		
		grunt.config('watch', watchConfig);
	}

	function createAssetWatchTaskFiles(assetType, activeTheme, themes) {
		if(assetType === 'js') {
			return createJSWatchTaskFiles(activeTheme, themes);
		} else {
			return createGenericAssetWatchTaskFiles(assetType, activeTheme, themes);
		}
	}

	function createGenericAssetWatchTaskFiles(assetType, activeTheme, themes) {
		
		let theme = activeTheme; 
        const files = [createAssetGlobbingPattern(theme.source.assetPaths[assetType])];

        while(theme.parentTheme) {
            theme = themes[theme.parentTheme];
            if(theme.source.assetPaths[assetType]) {
            	files.push(createAssetGlobbingPattern(theme.source.assetPaths[assetType]));
            }            
        } 

        return files;
	}

	function createAssetGlobbingPattern(assetDir) {
		return path.join(assetDir, '**', '*');
	}

	function createJSWatchTaskFiles(activeTheme, themes) {
		let files = createGenericAssetWatchTaskFiles('js', activeTheme, themes);
		
		if(activeTheme.js && activeTheme.js.processors) {

			const jspmProcessor = activeTheme.js.processors.find(function(processorObj) {
				return processorObj.type == 'jspm';
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
		}
		
		return files;
	}
}
