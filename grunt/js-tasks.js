module.exports = function(grunt, options){
	var configurator = require('./lib/js/configurator')(grunt, options);
	configurator.configure();

	grunt.task.registerTask('build-js', 'Build JS assets', function() {		
		var taskName = 'build-js-' + options.js.processor;
    	grunt.task.run(taskName);		
    });

    grunt.task.registerTask('export-js', 'Export JS assets', function() {	
    	var taskName = 'export-js-' + options.js.processor;
    	grunt.task.run(taskName);		
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
	        tasks: ["<%= watchTask %>-js"],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
	    }
	};
};