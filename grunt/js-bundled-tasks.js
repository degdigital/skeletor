module.exports = function(grunt, options){
	
	function buildConcatConfig() {
		var config = {};

		var bundleConcat = require('./lib/bundleConcat')(grunt, options);
		bundleConcat.buildConfigForBundles(config);	

		var systemJSConcat = require('./lib/systemJSConcat')(grunt, options);
		systemJSConcat.buildConfigForSystemJS(config);	

		return config;
	}

	return {
		shell: {
	    	options: {
	        stdout: true
	      },
	      command: function() {
	      	var shellHelper = require('./lib/bundleShell')(grunt, options);
	      	return shellHelper.buildAllBundleCommands();
	      }      
	    },
	    clean:  [
	    		'<%= paths.source.js %>/**/*-bundle.js',
	    		'<%= paths.source.js %>/**/*-bundle-*.js'
	    	],
	    sync: {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: [
			    '**/*-bundle.js',			    
			    "config.js",
			    "jspm_packages/system.js",
                "jspm_packages/system-polyfills.js",
                "polyfills/picturefill.js"
				],
			  dest: '<%= paths.dest.js %>'
			}],
			ignoreInDest: '**/*-bundle-*.js',
			updateAndDelete:true,
			verbose: true
	    },
	    concat: buildConcatConfig()
	};
};