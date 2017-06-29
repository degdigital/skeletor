module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-sync');
	
	grunt.config.merge({
		sync: {
			images: {
				files: [],
				updateAndDelete:false,
				verbose: true
			}
		}
	});

};