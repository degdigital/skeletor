module.exports = function(grunt, options) {

	var bundleUtils = require('./bundle-utils');

	function getExcludesForBundle(bundle) {
		var excludes = [];
	    if(bundle.exclude) {
	        excludes = bundle.exclude; 
	    } else if(options.js.bundles.defaultExclude && options.js.bundles.defaultExclude != bundleUtils.getBundleName(bundle)) {
	        excludes = options.js.bundles.defaultExclude;
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
        if(grunt.option('minifyJS')) {
        	bundleCommandStr += ' --minify';
        }
        return bundleCommandStr;    
    }

	function buildCommandsForBundle(bundle) {
        var bundleFilepath = bundleUtils.getBundleFilepath(bundle, options.paths.source.js);    
        
        var bundleType = options.js.bundles.selfExecuting ? 'bundle-sfx' : 'bundle';
     	var bundleCommandStr = '';

        var bundleExcludes = getExcludesForBundle(bundle); 

        	
        bundleCommandStr += buildBundleCommand(bundleType, bundleFilepath, bundle.entry, [], bundleExcludes)
       
        return bundleCommandStr;          
    }

	function buildAllBundleCommands() {		
        var commands = options.js.bundles.items.map(buildCommandsForBundle);       
        return commands.join(' && ');
	}

	return {
		buildAllBundleCommands: buildAllBundleCommands
	};
}