module.exports = function(grunt, options){
  	if(grunt.config('production')) {
  		options.bundles.devMode = false;
    	grunt.option('skip-js-polyfills', false);
  	} else {
  		if(grunt.option('bundle-js')) {
	      options.bundles.devMode = false;
	    }
  	}

	grunt.task.registerTask('build-js', 'Build JS assets', function() {
        if(grunt.config('bundles').devMode) {
            grunt.task.run('build-js-raw');
        } else {
            grunt.task.run('build-js-bundled');
        }
    });

	return {		
	    watch: {
	        files: [
	        	"<%= paths.source.js %>/**/*.js", 
	        	"!<%= paths.source.js %>/**/*-bundle.js",
	        	"!<%= paths.source.js %>/**/*-bundle-*.js",
	        	"!<%= paths.source.js %>/config.js",
				"!<%= paths.source.js %>/map-polyfills.js"
	        ],
	        tasks: ["build-js"],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
	    }
	};
};