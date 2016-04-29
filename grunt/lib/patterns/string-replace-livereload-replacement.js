module.exports = function(activeTheme) {

	function getLiveReloadPort() {
		var options = activeTheme.listen.livereload;
		return options.port ? options.port : 35729;
	}

	function buildAddScriptReplacement() {		
		var port = getLiveReloadPort();

		return {
			pattern: /<\/body>/,
			replacement: '<script src="http://localhost:' + port + '/livereload.js"></script></body>'
		};
	}

	function buildRemoveScriptReplacement() {		
		var port = getLiveReloadPort();

		return {
			pattern: new RegExp('<script src="http://localhost:' + port + '/livereload.js"></script></body>'),
			replacement: '</body>'
		};
	}

	return {
		buildAddScriptReplacement: buildAddScriptReplacement,
		buildRemoveScriptReplacement: buildRemoveScriptReplacement
	};
}