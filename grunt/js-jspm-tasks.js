module.exports = function(grunt, options){

	grunt.task.registerTask('build-js-jspm', 'Build JS assets via JSPM', function() {		
		if(options.js.enableBundling) {
            grunt.task.run('build-js-jspm-bundled');
        } else {
            grunt.task.run('build-js-jspm-raw');
        }
    });

	function buildConcatConfig() {
		var config = {};

		var bundleConcatConfigurator = require('./lib/jspm/bundle-concat-configurator')(grunt, options);
		bundleConcatConfigurator.buildConfigForPolyfilledBundles(config);	

		var polyfillsMapConcatConfigurator = require('./lib/jspm/polyfills-map-concat-configurator')(grunt, options);
		polyfillsMapConcatConfigurator.buildConfigForPolyfillsMap(config);	

		return config;
	}

	return {
		shell__bundle: {
	    	options: {
	        stdout: true
	      },
	      command: function() {
	      	var bundleCommandBuilder = require('./lib/jspm/bundle-command-builder')(grunt, options);
	      	return bundleCommandBuilder.buildAllBundleCommands();
	      }      
	    },
	    shell__unbundle: {
	    	options: {
	        stdout: true
	      },
	      command: 'jspm unbundle'     
	    },	    
	    clean__bundle:  [
    		'<%= paths.source.js %>/**/*-bundle.js',
    		'<%= paths.source.js %>/**/*-bundle-*.js'
    	],
	    'sync__bundle-dev': {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: [
			    '**/*-bundle.js',			    
			    "config.js",
			    "jspm_packages/system.js",
                "jspm_packages/system-polyfills.js",
                "polyfills/picturefill.js"
				],
			  dest: '<%= paths.public.js %>'
			}],
			ignoreInDest: '**/*-bundle-*.js',
			updateAndDelete:true,
			verbose: true
	    },
	    'sync__bundle-deploy': {
	    	files: [{
			  cwd: '<%= paths.public.js %>',
			  src: '**/*',
			  dest: '<%= paths.export.js %>'
			}],
			updateAndDelete:true,
			verbose: true
	    },
	    'sync__raw-dev': {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: [
			  	'**/*.js',
			  	'!map-polyfills.js'
			  ],
			  dest: '<%= paths.public.js %>'
			}],
			ignoreInDest: '**/*-bundle-*.js',
			updateAndDelete:true,
			verbose: true
	    },
	    concat__bundle: buildConcatConfig()
	};
};