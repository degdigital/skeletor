module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			fonts: {
				files: [],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};