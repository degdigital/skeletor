const filesConfigurer = function() {

	function getFilesToProcess(assetType, activeTheme, baseTask) {
		const path = require('path');

		if(activeTheme.hasOwnProperty(assetType) === false) {
			return '**/*';
		}

		const files = activeTheme[assetType].files;

		return files
			.filter(file => {
				return file.process == 'all' || file.process == baseTask;
			})
			.reduce((files, file) => {
				return files.concat(file.src);
			}, [])
			.map(file => {
				return path.normalize(file);
			});
	}

	function configure(assetType, activeTheme, themes, baseTask) {
		
		const filesToProcess = getFilesToProcess(assetType, activeTheme, baseTask);
		const filesConfig = [];
		const dest = (baseTask === 'export') ? 
			activeTheme.export.assetPaths[assetType] : 
			activeTheme.public.assetPaths[assetType];
		let theme = activeTheme;

		do {
			filesConfig.push({
				expand: true,
				cwd: theme.source.assetPaths[assetType],
				src: filesToProcess,
				dest: dest
			});
			theme = theme.parentTheme ? themes[theme.parentTheme] : null;
		} while(theme);
		
		return filesConfig;
	}

	return {
		configure: configure
	}

}

module.exports = filesConfigurer();