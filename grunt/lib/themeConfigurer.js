module.exports = function(grunt) {

	var path = require('path'),
		dirs = ['source', 'public', 'export'];

	function configureThemes(themes, themeDefaults) {
		for(var themeName in themes) {
			configureTheme(themeName, themes[themeName], themeDefaults);
		}
	}	

	function configureTheme(themeName, theme, themeDefaults) {
		if(theme.hasOwnProperty('basePath') == false)
			theme.basePath = themeName;

		dirs.forEach(function(dir) {
			theme[dir] = configureThemeDir(theme[dir], themeDefaults[dir], theme.basePath);
		});

		theme.css = Object.assign({}, themeDefaults.css, theme.css);
		theme.images = Object.assign({}, themeDefaults.images, theme.images);
		theme.js = Object.assign({}, themeDefaults.js, theme.js);
		theme.patterns = Object.assign({}, themeDefaults.patterns, theme.patterns);
		theme.listen = Object.assign({}, themeDefaults.listen, theme.listen);
	}

	function configureThemeDir(themeDir, defaultDir, themeBasePath) {
		if(typeof themeDir === 'undefined') {
			themeDir = {};
		}

		var mergedDir = Object.assign({}, defaultDir, themeDir);
		mergedDir.assetPaths = Object.assign({}, defaultDir.assetPaths, themeDir.assetPaths);
		mergedDir.assetUrls = Object.assign({}, defaultDir.assetUrls, themeDir.assetUrls);
		var basePath = mergedDir.basePath ? path.join(themeBasePath, mergedDir.basePath) : themeBasePath;

		for(var assetPath in mergedDir.assetPaths) {
			mergedDir.assetPaths[assetPath] = path.join(basePath, mergedDir.assetPaths[assetPath]);
		}

		return mergedDir;
	}

	return {
		configureThemes: configureThemes
	}
}