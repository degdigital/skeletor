module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.config.merge({
		watch: {
			images: {
				files: [],
		        tasks: [],
		        options: {
		            "spawn": false,
		            event: ['changed', 'added', 'deleted']
		        }
		    }
		}
	});
}