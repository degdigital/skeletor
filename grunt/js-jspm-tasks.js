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

		if(options.js.bundles.selfExecuting == false) {
			config.files['<%= paths.public.js %>/config.js'] = [
				'<%= paths.source.js %>/config.js',
				'<%= paths.source.js %>/bundleHelper.js'
			];
		}
		return config;
	}

	function buildStringReplaceConfig(isDeploy) {
		var config = {};

		var bundleHelperStringReplaceConfigurator = require('./lib/jspm/bundle-helper-string-replace-configurator')(grunt, options);
		bundleHelperStringReplaceConfigurator.buildConfig(config, isDeploy);

		return config;
	}

	function buildSyncBundleDevConfig() {
		filesSrc = [
        	"polyfills/picturefill.js",
			'**/*-bundle.js'
		];	

		if(options.js.bundles.selfExecuting) {
			filesSrc.push('bundleHelper.js');
		} else {
			filesSrc = filesSrc.concat([
					"jspm_packages/system.js",
		            "jspm_packages/system-polyfills.js"
				]);
		}	

		return {
	    	files: [{
			  cwd: '<%= paths.source.js %>',
			  src: filesSrc,
			  dest: '<%= paths.public.js %>'
			}],
			ignoreInDest: '**/*-bundle-*.js',
			updateAndDelete:true,
			verbose: true
	    };
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
	    'sync__bundle-dev': buildSyncBundleDevConfig(),
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
	    concat__bundle: buildConcatConfig(),
	    'string-replace__bundle-dev': buildStringReplaceConfig(false),
	    'string-replace__bundle-deploy': buildStringReplaceConfig(true)
	};
};