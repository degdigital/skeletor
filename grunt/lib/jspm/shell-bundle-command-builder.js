module.exports = function(activeTheme, processorOptions) {

	var bundleUtils = require('./bundle-utils');
    var path = require('path');

	function getExcludesForBundle(bundle) {
		var excludes = [],
            defaultExclude = processorOptions.bundles.defaultExclude;
	    if(bundle.exclude) {
	        excludes = bundle.exclude; 
	    } else if(defaultExclude && defaultExclude != bundleUtils.getBundleName(bundle)) {
	        excludes = defaultExclude;
	    }
	    return excludes;
	}

	function buildArithmeticString(filenames, type) {
		if(Array.isArray(filenames) == false) {
	    	filenames = [filenames];
	    }
	    var operator = (type == 'addition') ? '+' : '-';
    	var commands = filenames.map(function(filename){
        	return operator + ' ' + filename + '.js';
      	});

	    return commands.join(' ');
	}

	function buildBundleCommand(bundleType, bundleFilepath, entry, additions, subtractions) { 
        var bundleCommandStr = 'jspm ' + bundleType + ' ' + entry;
        
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
        var basePath = activeTheme.source.assetPaths.js;
        if(activeTheme.basePath) {
            basePath = basePath.replace(activeTheme.basePath + path.sep, '');
        }
        
        var bundleFilepath = bundleUtils.getBundleFilepath(bundle, basePath);    
        
        var bundleType = processorOptions.bundles.selfExecuting ? 'bundle-sfx' : 'bundle';
     	var bundleCommandStr = '';

        var bundleExcludes = getExcludesForBundle(bundle); 

        	
        bundleCommandStr += buildBundleCommand(bundleType, bundleFilepath, bundle.entry, [], bundleExcludes)
       
        return bundleCommandStr;          
    }

	function buildAllBundleCommands() {
        var bundles = processorOptions.bundles;
        
        var commands = bundles.items.map(buildCommandsForBundle); 

        if(activeTheme.basePath) {
            commands.unshift('cd ' + activeTheme.basePath);   
        }
        
        return commands.join(' && ');
	}

    function buildUnbundleCommands() {
        var commands = [];

        if(activeTheme.basePath) {
            commands.push('cd ' + activeTheme.basePath);
        }
        commands.push('jspm unbundle');

        return commands.join(' && ');
    }

	return {
		buildAllBundleCommands: buildAllBundleCommands,
        buildUnbundleCommands: buildUnbundleCommands
	};
}