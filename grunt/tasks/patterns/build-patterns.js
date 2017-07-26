module.exports = function(grunt) {

	grunt.registerMultiTask('build-patterns', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.patterns && activeTheme.public.assetPaths.patterns) {
			let plConfig = getPatternConfig(activeTheme);

			buildPatterns(activeTheme, plConfig);

			copyStyleguideAssets(activeTheme, plConfig);
		}
	});

	//Copy styleguide assets form styleguide source to public
	function copyStyleguideAssets(activeTheme, plConfig) {
		let path = require('path');

		let styleguideAssetsDir = path.normalize(plConfig.paths.source.styleguide + "styleguide");
		grunt.config('sync.patterns_build_styleguide_assets.files.0.cwd', styleguideAssetsDir);
		grunt.task.run("sync:patterns_build_styleguide_assets")
	}

	function buildPatterns(activeTheme, plConfig) {
		let pl = require('patternlab-node')(plConfig);

		pl.build(function(){}, true);
	}

	//Merge theme's pattern config with default pattern config
	function getPatternConfig(activeTheme) {
		let mergeDeep = require('../../lib/utils/mergeDeep');
		let defaultConfig = getDefaultPatternLabConfig(activeTheme);
		return mergeDeep(defaultConfig, activeTheme.patterns.plConfig);
	}

	function getDefaultPatternLabConfig(activeTheme) {
		return {
		  "paths" : {
		    "source" : {
		      "root": "./" + activeTheme.source.basePath + "/",
		      "patterns" : "./" + activeTheme.source.assetPaths.patterns + "/",
		      "data" : "./" + activeTheme.source.assetPaths.patternData + "/",
		      "meta": "./" + activeTheme.source.assetPaths.patternMeta + "/",
		      "annotations" : "./" + activeTheme.source.assetPaths.patternAnnotations + "/",
		      "styleguide" : "./node_modules/styleguidekit-assets-default/dist/",
		      "patternlabFiles" : "./node_modules/styleguidekit-mustache-default/views/"
		    },
		    "public" : {
		      "root" : "./" + activeTheme.public.basePath + "/",
		      "patterns" : "./" + activeTheme.public.assetPaths.patterns + "/",
		      "data" : "./" + activeTheme.public.basePath + "/styleguide/data/",
		      "annotations" : "./" + activeTheme.public.basePath + "/annotations/",
		      "styleguide" : "./" + activeTheme.public.basePath + "/styleguide/"
		    }
		  },
		  "styleGuideExcludes": [
		  ],
		  "defaultPattern": "all",
		  "patternExtension": "mustache",
		  "ignored-extensions" : [],
		  "ignored-directories" : [],
		  "debug": false,
		  "ishControlsHide": {
		    "s": false,
		    "m": false,
		    "l": false,
		    "full": false,
		    "random": true,
		    "disco": true,
		    "hay": true,
		    "mqs": false,
		    "find": false,
		    "views-all": false,
		    "views-annotations": false,
		    "views-code": false,
		    "views-new": false,
		    "tools-all": false,
		    "tools-docs": false
		  },
		  "ishMinimum": "240",
		  "ishMaximum": "2600",
		  "patternStateCascade": ["inprogress", "inreview", "complete"],
		  "patternStates": {
		  },
		  "patternExportPatternPartials": [],
		  "patternExportDirectory": "./" + activeTheme.export.assetPaths.patterns + "/",
		  "baseurl" : "",
		  "cacheBust": true,
		  "starterkitSubDir": "dist",
		  "outputFileSuffixes": {
		    "rendered": "",
		    "rawTemplate": "",
		    "markupOnly": ".markup-only"
		  }
		}

	}
}