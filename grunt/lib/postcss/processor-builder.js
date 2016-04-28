module.exports = function(activeTheme, themes) {

	var defaultProcessors = [
		{ name: 'postcss-import'},		
   		{ name: 'postcss-mixins' },
   		{ name: 'postcss-custom-properties'},
   		{ name: 'postcss-custom-media'},
   		{ name: 'postcss-calc'},
   		{ name: 'postcss-color-function'},
   		{ name: 'postcss-nested'},
   		{ name: 'autoprefixer', options: {browsers: 'last 2 versions'} },
   		{ name: 'csswring'}	
	];

	function buildProcessors() {		
		return defaultProcessors.map(createProcessorInstance);
	}

	function createProcessorInstance(processor) {
		processor.options = processor.options ? processor.options : {};

		if(processor.name == 'postcss-import') {
			setImportProcessorPathOption(processor);
		}

		mergeProcessorOptions(processor);

		return require(processor.name)(processor.options);
	}

	function mergeProcessorOptions(processor) {
		var optionsFromTheme = getProcessorOptionsForTheme(processor.name);

		if(optionsFromTheme) {
			processor.options = Object.assign({}, processor.options, optionsFromTheme);
		}
	}

	function getProcessorOptionsForTheme(processorName) {
		if(activeTheme.css.postcss.processors) {
			var processorForTheme = activeTheme.css.postcss.processors.find(function(processor){
				return processor.name == processorName;
			});

			if(processorForTheme) {
				return processorForTheme.options;
			}
		}

		return null;
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