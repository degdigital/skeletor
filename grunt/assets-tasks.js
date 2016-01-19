module.exports = function(grunt, options) {
	return {
		'sync__images-dev': {
			files: [{
			  cwd: '<%= paths.source.images %>',
			  src: '**/*',
			  dest: '<%= paths.public.images %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		'sync__images-deploy': {
			files: [{
			  cwd: '<%= paths.source.images %>',
			  src: '**/*',
			  dest: '<%= paths.export.images %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		'sync__fonts-dev': {
			files: [{
			  cwd: '<%= paths.source.fonts %>',
			  src: '**/*',
			  dest: '<%= paths.public.fonts %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		'sync__fonts-deploy': {
			files: [{
			  cwd: '<%= paths.source.fonts %>',
			  src: '**/*',
			  dest: '<%= paths.export.fonts %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		'sync__api-dev': {
			files: [{
			  cwd: '<%= paths.source.api %>',
			  src: '**/*.json',
			  dest: '<%= paths.public.api %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		'sync__api-deploy': {
			files: [{
			  cwd: '<%= paths.source.api %>',
			  src: '**/*.json',
			  dest: '<%= paths.export.api %>'
			}],
			updateAndDelete:true,
			verbose: true
		},
		watch__images: {
	        files: [
	            "<%= paths.source.images %>/**/*"
	            ],
	        tasks: ["<%= watchTask %>-images"],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
	    },
	    watch__fonts: {
	        files: [
	            "<%= paths.source.fonts %>/**/*"
	            ],
	        tasks: ["<%= watchTask %>-fonts"],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
	    },
	    watch__api: {
	        files: [
	            "<%= paths.source.api %>/**/*.json"
	            ],
	        tasks: ["<%= watchTask %>-api"],
	        options: {
	            "spawn": true,
	            event: ['changed', 'added', 'deleted']
	        }
	    }
	}
};