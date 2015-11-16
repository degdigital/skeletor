module.exports = function(grunt) {
  function getExcludeString(bundleName, bundleExclude, defaultExclude) {
    var excludes = [];
    if(bundleExclude) {
        excludes = bundleExclude; 
    } else if(defaultExclude && defaultExclude != bundleName) {
        excludes = defaultExclude;
    }

    if(excludes) {
      if(Array.isArray(excludes) == false) {
        excludes = [excludes];
      }
      var excludeCommands = excludes.map(function(exclude){
        return '- ' + exclude + '.js';
      });

      return excludeCommands.join(' ');
    }

    return '';
  }

	return {
    patternlab: {
  		options: {
  			stdout: true
  		},
  		command: 'php core/builder.php -g'
  	},
  	'jspm-bundle': {
    	options: {
        stdout: true
      },
      command: function() {   
        var bundlesConfig = grunt.config('bundles');
        var commands = bundlesConfig.items.map(
          function(bundle) {
            var bundleName = bundle.name ? bundle.name : bundle.entry + '-bundle'; 
            var bundleFilename = grunt.config('paths').src.js + '/' + bundleName + '.js';    
            
            var bundleCommandStr = 'jspm bundle ' + bundle.entry;
            
            var excludeString = getExcludeString(bundleName, bundle.exclude, bundlesConfig.defaultExclude);
            if(excludeString != '') {
              bundleCommandStr += ' ' + excludeString;  
            }  

            bundleCommandStr += ' ' + bundleFilename + ' --inject -m';
            return bundleCommandStr;          
          }
        );
        return commands.join(' && ');
      }      
    },
    'jspm-unbundle': {
    	options: {
        stdout: true
      },
      command: 'jspm unbundle'
    }
  };
}