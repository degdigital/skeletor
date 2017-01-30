"use strict";

module.exports = function(activeTheme) {

	function processPattern(patternContent) {
		patternContent = removePatternLabCode(patternContent);
		patternContent = updateAssetUrls(patternContent);

		return patternContent;
	}

	function removePatternLabCode(content) {
		return content.replace(/<!-- Begin Pattern Lab [\s\S]* End Pattern Lab -->/ig, "")
				      .replace(/<!-- Begin Pattern Lab JS [\s\S]* End Pattern Lab JS -->/ig, "")
				      .replace(/\.css\?[0-9]*/g,".css")
				      .replace('<link rel="stylesheet" href="css/styleguide.css">', "");
	}

	function updateAssetUrls(content) {
		let result = content;

		let assetUrlKeys = Object.keys(activeTheme.export.assetUrls);
	
		return assetUrlKeys.reduce(function(newContent, assetUrlKey) {
			if(activeTheme.public.assetUrls.hasOwnProperty(assetUrlKey)) {
				var assetRegex = new RegExp(activeTheme.public.assetUrls[assetUrlKey], 'ig');
				return newContent.replace(assetRegex, activeTheme.export.assetUrls[assetUrlKey]);			
			}
			return newContent;
		}, content);
	}
	

	return {
    	processPattern: processPattern
    }
}