module.exports = function(grunt, options) {

	var path = require("path");
	var bundleUtils = require('./bundle-utils');

	var bundleHelperFilename = 'bundleHelper.js';
	var configFilename = "config.js";

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

	function createBundleHelperBundlesReplacement() {
		var bundleContent = 'var bundles = [';

		bundleContent = options.js.bundles.items
			.filter(doesBundleHavePolyfills)
			.reduce(createBundleDef, bundleContent);

		bundleContent += ']';

		return {
			pattern: 'var bundles = []',
			replacement: bundleContent

		};
	}

	function createBaseUrlReplacement(isDeploy) {
		var jsUrl = isDeploy ? options.urls.export.js : options.urls.public.js;

		return {
			pattern: /<%=\s*jsUrl\s*%>/,
			replacement: jsUrl
		};
	}

	function buildConfig(config, isDeploy) {
		if(config.hasOwnProperty("files") == false) {
			config.files = {};
		}

		if(config.hasOwnProperty("options") == false) {
			config.options = {};
		}

		config.options.replacements = [];

		if(isDeploy) {
			config.options.replacements.push(createBaseUrlReplacement(isDeploy));

			if(options.js.bundles.selfExecuting) {
				var bundleHelperFilepath = path.join(options.paths.export.js, bundleHelperFilename);
				config.files[bundleHelperFilepath] = bundleHelperFilepath;
			} else {
				var configFilepath = path.join(options.paths.export.js, configFilename);
				config.files[configFilepath] = configFilepath;
			}
		} else {
			config.options.replacements.push(createBundleHelperBundlesReplacement());
			config.options.replacements.push(createBaseUrlReplacement(isDeploy));

			if(options.js.bundles.selfExecuting) {
				var bundleHelperFilepath = path.join(options.paths.public.js, bundleHelperFilename);
				config.files[bundleHelperFilepath] = bundleHelperFilepath;
			} else {
				var configFilepath = path.join(options.paths.public.js, configFilename);
				config.files[configFilepath] = configFilepath;
			}
		}
	}

	return {
		buildConfig: buildConfig
	};
}