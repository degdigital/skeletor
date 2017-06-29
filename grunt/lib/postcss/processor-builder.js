"use strict";

module.exports = function(activeTheme, themes) {

	function buildProcessors() {	
		let processors = activeTheme.css.postcss.processors;

		if(Array.isArray(processors)) {
			return processors.map(createProcessorInstance);
		}		
	}

	function createProcessorInstance(processor) {
		processor.options = processor.options ? processor.options : {};

		if(processor.name == 'postcss-easy-import') {
			setImportProcessorPathOption(processor);
		}

		return require(processor.name)(processor.options);
	}

	function setImportProcessorPathOption(processor) {
		var importPathConfigurer = require('./import-path-configurer')();
		var path = importPathConfigurer.configureImportPath(activeTheme, themes);
		processor.options.path = path;
	}

	return {
    	buildProcessors: buildProcessors
    }
}