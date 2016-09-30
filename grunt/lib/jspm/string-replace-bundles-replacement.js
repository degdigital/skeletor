module.exports = function(processorOptions) {

	var path = require("path");
	var bundleUtils = require('./bundle-utils');

	function doesBundleHavePolyfills(bundle) {
		return bundle.polyfills && bundle.polyfills.length > 0;
	}

	function createBundleDef(bundleContent, bundle, currentIndex, array) {
		var bundleFilename = bundleUtils.getBundleFilepath(bundle, '');
		bundleContent += "{filename: '" + bundleFilename + "',tests:[";
		
		if(doesBundleHavePolyfills(bundle)) {
			var polyfillNames = bundle.polyfills.map(function(polyfill) {
				return "'" + bundleUtils.getPolyfillNameFromPath(polyfill) + "'";
			});
			bundleContent += polyfillNames.join(",");
		}
		
		bundleContent += "]}";

		if(currentIndex < (array.length - 1)) {
			bundleContent += ',';
		}

		return bundleContent;
	}

	function buildReplacement() {		
		var bundleContent = 'var bundles = [';

		bundleContent = processorOptions.bundles.items
			.reduce(createBundleDef, bundleContent);

		bundleContent += ']';

		return {
			pattern: 'var bundles = []',
			replacement: bundleContent

		};
	}

	return {
		buildReplacement: buildReplacement
	};
}