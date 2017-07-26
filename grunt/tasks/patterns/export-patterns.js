const path = require('path');

module.exports = function(grunt) {
	grunt.registerMultiTask('export-patterns', function() {
		grunt.config('activeTheme', this.data);
		var activeTheme = grunt.config('activeTheme');

		if(activeTheme.source.assetPaths.patterns && activeTheme.export.assetPaths.patterns) {
			grunt.task.run('build-patterns:' + this.target);

			configureCopy(activeTheme);
			grunt.task.run('copy:patterns_export');
			
			grunt.task.run('prettify:patterns_export');
		}
	});

	function configureCopy(activeTheme) {
		const patternExportProcessor = require("../../lib/patterns/pattern-export-processor")(activeTheme);
		
		const filesConfigs = activeTheme.patterns.export.map(entry => {
			return createFilesConfig(entry, activeTheme);
		});

		const config = {
			options: {
				process: patternExportProcessor.processPattern
			},
			files: filesConfigs
		};

		grunt.config('copy.patterns_export', config);
	}

	function createFilesConfig(entry, activeTheme) {
		const dest = path.join(activeTheme.export.assetPaths.patterns, entry.dest);

		return {
		        "expand": true,
		        "cwd": activeTheme.public.assetPaths.patterns,
		        "src": buildSourceFiles(entry),
		        "dest": dest,
		        "flatten": true,
		        "filter": 'isFile',
		        "rename": renameFileToCopy
		    };
	}

	function buildSourceFiles(entry) {
		if(Array.isArray(entry.patterns) === false) {
			entry.patterns = [entry.patterns];
		}

		const sourceFiles = entry.patterns.map(pattern => {
			let dir = '*-' + entry.patternType + '-*';
			let filename = '*-' + entry.patternType + '-*';
			if(pattern !== '*') {
				dir += '-' + pattern;
				filename += '-' + pattern;
			}
			filename += '.html';

			return path.join(dir, filename);
		});
		
		sourceFiles.push(path.normalize('!**/*.markup-only.html'));

		return sourceFiles;
	}

	function renameFileToCopy(dest, src) {
		return path.join(dest, src.replace(/^(\d*-)?(pages|templates|components|basics)?-(\d*-)?/, ''));
	}
}
