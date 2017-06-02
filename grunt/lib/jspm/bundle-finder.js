const bundleFinder = function(activeTheme, bundles) {

	const path = require('path');
	const bundleUtils = require('./bundle-utils');

	function getConfigFilepath() {
		
		const basePath = activeTheme.source.assetPaths.js;

		return path.join(basePath, 'config.js');
	}

	function readConfigFile() {
		const fs = require('fs');
 
		const contents = fs.readFileSync(getConfigFilepath(), 'utf8');
		return contents;
	}

	function getConfigBundles() {
		const configContents = readConfigFile();

		const re = /bundles: ({[^}]*})/;
		const matches = configContents.match(re);
		
		if(matches !== null && matches.length > 1) {
			return JSON.parse(matches[1]);
		}

		return null;
	}

	function getConfigBundleEntryNames(relativeFilepath) {
		const configBundles = getConfigBundles();
		if(configBundles !== null) {
			
			return Object.keys(configBundles)
				.filter(function(bundleName) {
					return configBundles[bundleName].indexOf(relativeFilepath) >= 0;
				})
				.map(function(bundleName) {
					return bundleUtils.getBundleEntryName(bundleName);
				});
		}

		return [];
	}

	function findByFilepath(filepath) {
		const relativeFilepath = path.relative(activeTheme.source.assetPaths.js, filepath);
		
		const configBundleEntryNames = getConfigBundleEntryNames(relativeFilepath);

		if(configBundleEntryNames.length === 0) {
			return [];
		}

		return bundles.filter(function(bundle){
			return configBundleEntryNames.indexOf(bundle.entry) >= 0;
		});
	}

	function findByEntryModule(entryModule) {
		return bundles.filter(function(bundle) {
			return bundle.entry === entryModule;
		});
	}

	return {
		findByFilepath: findByFilepath,
		findByEntryModule: findByEntryModule
	}

}

module.exports = bundleFinder;