module.exports = function(activeTheme, processorOptions) {

	const bundleUtils = require('./bundle-utils');
    const path = require('path');

	function getExcludesForBundle(bundle) {
        let excludes = [],
            defaultExclude = processorOptions.bundles.defaultExclude;
        if(bundle.exclude) {
            excludes = bundle.exclude; 
        } else if(defaultExclude && defaultExclude != bundle.entry) {
            excludes = defaultExclude;
        }
        return excludes;
    }

	function buildArithmeticString(filenames, type) {
		if(Array.isArray(filenames) == false) {
	    	filenames = [filenames];
	    }
	    const operator = (type == 'addition') ? '+' : '-';
    	const commands = filenames.map(function(filename){
        	return operator + ' ' + filename + '.js';
      	});

	    return commands.join(' ');
	}

	function buildBundleCommandString(bundleType, bundleFilepath, entry, additions, subtractions) { 
        let bundleCommandStr = 'jspm ' + bundleType + ' ' + entry;
        
        if(additions.length) {
        	bundleCommandStr += ' ' + buildArithmeticString(additions, 'addition');
        }

        if(subtractions.length) {
        	bundleCommandStr += ' ' + buildArithmeticString(subtractions, 'subtraction');        
        }

        bundleCommandStr += ' ' + bundleFilepath + ' --inject --skip-source-maps';

        return bundleCommandStr;    
    }

	function buildCommandsForBundle(bundle) {
        const basePath = activeTheme.source.assetPaths.js;
        if(activeTheme.basePath) {
            basePath = basePath.replace(activeTheme.basePath + path.sep, '');
        }
        
        const bundleFilepath = bundleUtils.getBundleFilepath(bundle, basePath);    
        
        const bundleType = processorOptions.bundles.selfExecuting ? 'bundle-sfx' : 'bundle';
     	let bundleCommandStr = '';

        const bundleExcludes = getExcludesForBundle(bundle); 

        	
        bundleCommandStr += buildBundleCommandString(bundleType, bundleFilepath, bundle.entry, [], bundleExcludes)
       
        return bundleCommandStr;          
    }

	function buildBundleCommands(bundles) {
        let commands = bundles.map(buildCommandsForBundle); 

        if(activeTheme.basePath) {
            commands.unshift('cd ' + activeTheme.basePath);   
        }
        
        return commands.join(' && ');
	}

    function buildUnbundleCommands() {
        let commands = [];

        if(activeTheme.basePath) {
            commands.push('cd ' + activeTheme.basePath);
        }
        commands.push('jspm unbundle');

        return commands.join(' && ');
    }

	return {
		buildBundleCommands: buildBundleCommands,
        buildUnbundleCommands: buildUnbundleCommands
	};
}