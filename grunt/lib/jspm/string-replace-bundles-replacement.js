module.exports = function(activeTheme) {

	var path = require("path");
	var bundleUtils = require('./bundle-utils');

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

	function buildReplacement() {		
		var bundleContent = 'var bundles = [';

		bundleContent = activeTheme.js.bundles.items
			//.filter(doesBundleHavePolyfills)
			.reduce(createBundleDef, bundleContent);

		bundleContent += ']';

		return {
			pattern: 'var bundles = []',
			replacement: bundleContent

		};

		return config;
	}

	return {
		buildReplacement: buildReplacement
	};
}