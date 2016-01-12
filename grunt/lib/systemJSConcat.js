module.exports = function(grunt, options) {

	var path = require("path");
	var bundleUtils = require("./bundleUtils");
	var configFilename = "config.js";
	var mapPolyfillsFilename = 'map-polyfills.js';

	function doesBundleHavePolyfills(bundle) {
		return bundle.polyfills && bundle.polyfills.length > 0;
	}

	function createBundleDef(bundleContent, bundle) {
		var bundleFilename = bundleUtils.getBundleFilepath(bundle, '');
		bundleContent += "{filename: '" + bundleFilename + "',tests:[";
	
		var polyfillNames = bundle.polyfills.map(function(polyfill) {
			return "'" + bundleUtils.getPolyfillNameFromPath(polyfill) + "'";
		});

		bundleContent += polyfillNames.join(",");
		bundleContent += "]}";

		return bundleContent;
	}

	function addBundles(content, filepath) {
		var filename = path.basename(filepath);
		if(filename == mapPolyfillsFilename) {
			return addBundlesToFileContents(content);
		} else if(filename == configFilename){
			return updateBaseUrlInFileContents(content);
		} else {
			return content;
		}

	}

	function updateBaseUrlInFileContents(content) {
		return content.replace(/baseURL:.[^,]*/, 'baseURL: "' + options.urls.dest.js + '"');
	}

	function addBundlesToFileContents(content) {
		var bundleContent = 'var bundles = [';

		bundleContent = options.bundles.items
			.filter(doesBundleHavePolyfills)
			.reduce(createBundleDef, bundleContent);

		bundleContent += ']';

		return content.replace('var bundles = []', bundleContent);
	}

	function buildConfigForSystemJS(config) {
		if(config.hasOwnProperty("files") == false) {
			config.files = {};
		}

		if(config.hasOwnProperty("options") == false) {
			config.options = {};
		}

		config.options.process = addBundles;

		var destConfigFilepath = path.join(options.paths.dest.js, configFilename);
		config.files[destConfigFilepath] = [
			path.join(options.paths.source.js, configFilename),
			path.join(options.paths.source.js, mapPolyfillsFilename)
		]; 
	}

	return {
		buildConfigForSystemJS: buildConfigForSystemJS
	};	
};