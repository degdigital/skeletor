module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			api: {
				files: [],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};