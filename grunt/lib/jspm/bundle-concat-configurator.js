module.exports = function(grunt, options) {

	var path = require('path');
	var bundleUtils = require('./bundle-utils');

	function getArrayCombinations(arr) {
		var result = [];
	 	var f = function(prefix, arr) {
	  	for (var i = 0; i < arr.length; i++) {		
	  		var clonedPrefix = prefix.slice(0);
	  		clonedPrefix.push(arr[i]);
	      	result.push(clonedPrefix);	      
	      	f(clonedPrefix.slice(0), arr.slice(i + 1));
	    }
	  }
	  f([], arr);
	  return result;
	}

	function buildConcatDefsForBundle(config, bundle) {
		var polyfillCombos = getArrayCombinations(bundle.polyfills);

		polyfillCombos.reduce(function(config, polyfillCombo){
			var bundleFilepath = bundleUtils.getBundleFilepath(bundle, options.paths.public.js, polyfillCombo);  
			config.files[bundleFilepath] = getSourceFiles(bundle, polyfillCombo);
			return config;
		}, config);

		return config;
	}

	function getSourceFiles(bundle, polyfillCombo) {
		var sourceFiles = polyfillCombo.map(function(polyfill) {
			return path.join(options.paths.source.js, polyfill + '.js');
		});

		var bundleFilepath = bundleUtils.getBundleFilepath(bundle, options.paths.source.js);

		sourceFiles.push(bundleFilepath);
		return sourceFiles;
	}

	function doesBundleHavePolyfills(bundle) {
		return bundle.polyfills && bundle.polyfills.length > 0;
	}

	function buildConfigForPolyfilledBundles(config) {
		if(config.hasOwnProperty("files") == false) {
			config.files = {};
		}

		if(grunt.option('polyfills')) {
			return options.js.bundles.items
				.filter(doesBundleHavePolyfills)
				.reduce(buildConcatDefsForBundle, config);
		}
	}

	return {
		buildConfigForPolyfilledBundles: buildConfigForPolyfilledBundles
	};	

}